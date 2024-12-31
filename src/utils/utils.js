export function scrollToSection(event) {
    event.preventDefault();

    const targetId = event.target.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        // Défilement personnalisé pour amener la section sous le menu
        const rect = targetElement.getBoundingClientRect();
        const offset = rect.top + window.scrollY - (window.innerHeight / 2.5) + (rect.height / 2);

        window.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    }
}