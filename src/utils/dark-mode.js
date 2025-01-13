const changeTheme = () => {
    const toggleBtns = document.querySelectorAll('#theme-toggle')

    function toggleTheme(onMount) {
        if (onMount) {
            document.body.classList.add('light-mode');
            document.querySelector('.hero__img').classList.add('hero__img-light')
            document.querySelector('.header').classList.add('header-light')
            document.querySelectorAll('.career__year-wrap').forEach(element => {
                element.classList.add('career__year-wrap-light')
            });
            document.querySelectorAll('.career__year_solo').forEach(element => {
                element.classList.add('career__year_solo-light')
            });
            document.querySelector('.footer__arrow').classList.add('footer__arrow-light')
        } else {
            document.body.classList.toggle('light-mode');
            document.querySelector('.hero__img').classList.toggle('hero__img-light')
            document.querySelector('.header').classList.toggle('header-light')
            document.querySelectorAll('.career__year-wrap').forEach(element => {
                element.classList.toggle('career__year-wrap-light')
            });
            document.querySelectorAll('.career__year_solo').forEach(element => {
                element.classList.toggle('career__year_solo-light')
            });
            document.querySelector('.footer__arrow').classList.toggle('footer__arrow-light')
        }

    }
    // State
    const theme = localStorage.getItem('theme');

    // On mount
    theme && toggleTheme(theme);

    // Handlers
    const handleThemeToggle = () => {
        toggleTheme()
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

export default changeTheme;