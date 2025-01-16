import express from 'express';
import cors from 'cors';
import nodemailer from "nodemailer"
import 'dotenv/config'
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

async function sendMyMail(email: string, name: string, message: string) {
    const newMessage = {
        from: email,
        to: process.env.EMAIL,
        subject: "Nouveau message de " + name,
        text: '- Mail : ' + email + '\n  - Message : ' + message,
    }
    const info = await transporter.sendMail(newMessage);
    return info
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
app.get('/', async (req, res) => {
    console.log("Test de fonctionnement du serveur")
    res.send("<h1>Hello word</h1>").end()
}
)

// Function to validate email address format
function validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

const sendEmailCallback = async (req: any, res: any) => {
    console.log("Send mail recu")
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
        } else {
            // Si l'email n'a pas pu être envoyé
            return res.status(400).json({ message: "Erreur lors de l'envoi de l'email", error: successInfo.rejected });
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

app.post('/sendMail', sendEmailCallback);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export default app;