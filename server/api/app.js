import express from 'express';
import nodemailer from "nodemailer";
import 'dotenv/config';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import { ItemController } from './article.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.join(__filename, '..'));
/* nodemailer */
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.API_KEY,
    },
});
// Function to validate email address format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
async function sendMyMail(email, name, message) {
    const newMessage = {
        from: email,
        to: process.env.EMAIL,
        subject: "Nouveau message de " + name,
        text: '- Mail : ' + email + '\n  - Message : ' + message,
    };
    const info = await transporter.sendMail(newMessage);
    return info;
}
const sendEmailCallback = async (req, res) => {
    console.log("Send mail recu");
    try {
        let { n, e, m, h } = req.body;
        if (!n || !e || !m || h) {
            return res.status(400).json({ message: "Des champs sont manquants" });
        }
        if (!validateEmail(e)) {
            return res.status(400).json({ message: "Email non valide" });
        }
        if (process.env.EMAIL === undefined) {
            return res.status(400).json({ message: "Problème d'environnement sur le serveur" });
        }
        const successInfo = await sendMyMail(e, n, m);
        if (successInfo && successInfo.accepted && successInfo.accepted.length > 0) {
            return res.status(200).json({ message: "Email envoyé avec succès" });
        }
        else {
            // Si l'email n'a pas pu être envoyé
            return res.status(400).json({ message: "Erreur lors de l'envoi de l'email", error: successInfo.rejected });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};
/* Auth */
const authentication = (req, res, next) => {
    console.log("Auth ");
    const authheader = req.headers.authorization;
    if (!authheader) {
        res.setHeader('WWW-Authenticate', 'Basic realm="mon site à moi", charset="UTF-8"');
        res.status(401).end();
    }
    else {
        // extract credentials info by removing leading 'Basic ' and decoding from Base64
        const credentials = Buffer.from(authheader.split(' ')[1], 'base64');
        const [user, password] = credentials.toString().toLowerCase().split(':');
        if (user === process.env.USER && password === process.env.PASSWORD) {
            //authorization granted
            // let's continue
            next();
        }
        else {
            // Bad user name or password
            res.setHeader('WWW-Authenticate', 'Basic realm="mon site à moi", charset="UTF-8"');
            res.status(401).end();
        }
    }
};
/* RateLimit */
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limite à 100 requêtes
    message: 'Trop de requêtes (>100), réessayez dans quelques minutes.',
});
const mailLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5, // Limite à 5 requêtes
    message: 'Trop de tentatives (>5), réessayez dans quelques minutes.',
});
/* Serveur */
const app = express();
const port = process.env.PORT || 80;
app.set('trust proxy', 1);
app.use("/api", apiLimiter);
app.use("/sendMail", mailLimiter);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
/* routes */
app.get('/', async (req, res) => {
    console.log("Test de fonctionnement du serveur");
    console.log(__dirname);
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/info', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'info.html'));
});
app.post('/sendMail', sendEmailCallback);
const articles = new ItemController(app);
/* Start */
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
export default app;
