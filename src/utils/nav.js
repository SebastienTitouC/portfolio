import { scrollToSection } from './utils';

const nav = () => {
    const header_links = document.querySelectorAll('.header__link')

    header_links.forEach(link => link.addEventListener('click',
        event => scrollToSection(event)))
}

export default nav;
