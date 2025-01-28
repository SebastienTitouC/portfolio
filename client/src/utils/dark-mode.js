const changeTheme = () => {
    const toggleBtns = document.querySelectorAll('#theme-toggle')

    function toggleTheme(onMount, isIndex) {
        if (onMount) {
            document.body.classList.add('light-mode');
            document.querySelector('.header').classList.add('header-light')
            if (isIndex) {
                document.querySelector('.hero__img').classList.add('hero__img-light')
                document.querySelectorAll('.career__year-wrap').forEach(element => {
                    element.classList.add('career__year-wrap-light')
                });
                document.querySelectorAll('.career__year_solo').forEach(element => {
                    element.classList.add('career__year_solo-light')
                });
            }
            document.querySelector('.footer__arrow').classList.add('footer__arrow-light')
        } else {
            document.body.classList.toggle('light-mode');
            document.querySelector('.header').classList.toggle('header-light')
            if (isIndex) {
                document.querySelector('.hero__img').classList.toggle('hero__img-light')
                document.querySelectorAll('.career__year-wrap').forEach(element => {
                    element.classList.toggle('career__year-wrap-light')
                });
                document.querySelectorAll('.career__year_solo').forEach(element => {
                    element.classList.toggle('career__year_solo-light')
                });
            }
            document.querySelector('.footer__arrow').classList.toggle('footer__arrow-light')
        }

    }
    // State
    const theme = localStorage.getItem('theme');

    // On mount
    theme && toggleTheme(theme, !document.location.href.includes("info"));

    // Handlers
    const handleThemeToggle = () => {
        toggleTheme("", !document.location.href.includes("info"))
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light-mode');
        } else {
            localStorage.removeItem('theme');
            document.body.removeAttribute('class');
        }
    };

    // Events
    toggleBtns.forEach(btn =>
        btn.addEventListener('click', handleThemeToggle)
    );
};

const infoThemeMode = () => {
    const infoContainer = document.querySelector('.aside__info-container')

    if (!localStorage.getItem('theme')) {
        setTimeout(() => {
            infoContainer.classList.add('aside__info-container-show')
            setTimeout(() => { infoContainer.classList.remove('aside__info-container-show') }, 5000)
        }, 7000)
    }
}

export { changeTheme, infoThemeMode };