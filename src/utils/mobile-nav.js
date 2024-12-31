import { scrollToSection } from './utils';

const mobileNav = () => {
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
        scrollToSection(event)
    }))
}

export default mobileNav;
