import express from 'express';
import cors from 'cors';
import nodemailer from "nodemailer"
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 80;

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

async function sendMyMail(email, name, message) {
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
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN, // Autoriser seulement les requêtes venant de cette origine
    methods: ['GET', 'POST'], // Autoriser seulement les méthodes GET et POST (tu peux ajouter d'autres méthodes si nécessaire)
    allowedHeaders: ['Content-Type'], // Autoriser certains en-têtes (par défaut c'est Content-Type)
}));


app.use(express.json());
app.get('/', async (req, res) => {
    console.log("Test de focntionnement du serveur")
    res.send("<h1>Hello word</h1>").end()
}
)

app.post('/sendMail', (req, res) => {
    try {
        console.log("Send mail recu")

        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ message: "Des champs sont manquants" });
        }

        if (process.env.EMAIL === undefined) {
            return res.status(400).json({ message: "Problème d'environnement sur le serveur" });
        }
        const successInfo = sendMyMail(email, name, message);

        res.status(200).json({ message: "OK" });
        /* res.status(400).json({ message: "Erreur " + successInfo.rejected }); // Action échouée */

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


module.exports = app;