const mobileNav = () => {
    const header = document.querySelector('.header')
    const header_mobile_menu = document.querySelector('.header-mobile__menuIcon')
    const header_mobile = document.querySelector('.header-mobile')
    const header_mobile_links = document.querySelectorAll('.header-mobile__link')

    header_mobile_menu.addEventListener('click',
        event => {
            header_mobile_menu.classList.toggle('header-mobile__bar-open')
            header_mobile.classList.toggle('hidden')
        })

    header_mobile_links.forEach(link => link.addEventListener('click', event => {
        header_mobile_menu.classList.toggle('header-mobile__bar-open')
        header_mobile.classList.toggle('hidden')
    }))

    /* Only for smartphone */
    if (window.innerWidth < 475) {
        let lastKnownScrollPosition = 0;
        document.addEventListener("scroll", (event) => {
            if ((lastKnownScrollPosition - window.scrollY) > 0) {
                header.classList.remove('header__hidden')
            } else {
                header.classList.add('header__hidden')
            }
            lastKnownScrollPosition = window.scrollY;
        })

        header.addEventListener("mouseover", () => {
            header.classList.remove('header__hidden')
        }, false);
        header.addEventListener("click", () => {
            header.classList.remove('header__hidden')
        }, false);
    }

}

export default mobileNav;
