const sendEmail = async () => {
    const contactForm = document.querySelector('.contact__contact-form')

    // Handlers
    const submitHandler = async (event) => {
        event.preventDefault()
        console.log("Formulaire soumis")

        const contactData = {
            name: event.target[0].value,
            email: event.target[1].value,
            message: event.target[2].value,
        }

        try {
            // Envoi de la requête POST vers le serveur Node.js
            const response = await fetch("https://my-server-cyan.vercel.app/sendMail", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Si tu envoies des données JSON
                },
                body: JSON.stringify(contactData), // Corps de la requête
            });

            // Traitement de la réponse
            if (response.ok) {
                const data = await response.json();
                console.log("Réponse du serveur:", data);
                alert('Votre message a bien été envoyé. Merci ' + contactData.name);
            } else {
                const errorData = await response.json();
                console.error("Erreur du serveur:", errorData.message);
                alert('Erreur: ' + errorData.message);
            }
        } catch (error) {
            console.error("Erreur de requête:", error);
            alert('Erreur lors de la communication avec le serveur.');
        }

    }

    // Events
    contactForm.addEventListener('submit', submitHandler)
}

export default sendEmail;