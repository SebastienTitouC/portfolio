
const sendEmail = async () => {
    const contactForm = document.querySelector('.contact__contact-form')

    // Function to validate email address format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Handlers
    const submitHandler = async (event) => {
        event.preventDefault()
        console.log("Formulaire soumis")
        if (document.querySelector('.contact__honeypot input').value != "") {
            event.target.closest('form').reset()
            return;
        }


        let contactData = {
            n: event.target[0].value,
            e: event.target[1].value,
            m: event.target[3].value,
            h: ""
        }

        if (validateEmail(contactData.e)) {
            console.log("Email valide ")

            try {
                // Envoi de la requête POST vers le serveur Node.js
                const response = await fetch("https://portfolio-stc.vercel.app/sendMail", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', },
                    body: JSON.stringify(contactData),
                });

                // Traitement de la réponse
                if (response.ok) {
                    const data = await response.json();
                    console.log("Réponse du serveur:", data);
                    alert('Votre message a bien été envoyé. Merci ' + contactData.n);
                } else {
                    const errorData = await response.json();
                    console.error("Erreur du serveur:", errorData.message);
                    alert('Erreur: ' + errorData.message);
                }
            } catch (error) {
                console.error("Erreur de requête:", error);
                alert('Erreur lors de la communication avec le serveur.');
            }
        } else {
            console.log("Email invalide ")
        }
        event.target.closest('form').reset()
    }

    // Events
    contactForm.addEventListener('submit', submitHandler)
}

export default sendEmail;