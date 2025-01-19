var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import cors from 'cors';
import nodemailer from "nodemailer";
import 'dotenv/config';
import rateLimit from 'express-rate-limit';
const app = express();
const port = process.env.PORT || 80;
/* nodemailer */
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limite chaque IP à 100 requêtes par fenêtre
    message: 'Trop de requêtes, veuillez réessayer plus tard'
});
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
function sendMyMail(email, name, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const newMessage = {
            from: email,
            to: process.env.EMAIL,
            subject: "Nouveau message de " + name,
            text: '- Mail : ' + email + '\n  - Message : ' + message,
        };
        const info = yield transporter.sendMail(newMessage);
        return info;
    });
}
/* Serveur */
app.set('trust proxy', 1);
app.use(limiter);
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express.json());
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Test de fonctionnement du serveur");
    console.log(process.env.ALLOWED_ORIGIN)
    res.send("<h1>Hello word</h1>").end();
}));
const sendEmailCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Send mail recu");
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ message: "Des champs sont manquants" });
        }
        if (process.env.EMAIL === undefined) {
            return res.status(400).json({ message: "Problème d'environnement sur le serveur" });
        }
        const successInfo = yield sendMyMail(email, name, message);
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
});
app.post('/sendMail', sendEmailCallback);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
export default app;
