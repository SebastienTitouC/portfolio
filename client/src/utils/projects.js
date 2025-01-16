const changeCardVisibility = () => {
    function onVisibilityChange(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.98) {
                entry.target.classList.remove('invisible');
            } else {
                entry.target.classList.add('invisible');
            }
        });
    }

    const observer = new IntersectionObserver(onVisibilityChange, {
        root: null,
        rootMargin: '0px',
        threshold: [.95, 1],
    });

    const cards = document.querySelectorAll('.projects__card');
    cards.forEach(card => {
        observer.observe(card); // On observe chaque carte
    });

}

const addDelayToSkill = () => {
    document.querySelectorAll('.projects__skill').forEach((el, index) => {
        el.style.animationDelay = `${index * 2}s`; /* Voir projects__skill css */
    });

    document.querySelectorAll('.projects__skill2').forEach((el, index) => {
        el.style.animationDelay = `${(index * 2) - 2}s`; /* Voir projects__skill css */
    });
}

export { changeCardVisibility, addDelayToSkill };
