import '../styles/modern-normalize.css' // Should be the first
import '../styles/fonts.css'
import '../styles/style.css'
import '../styles/components/header.css'
import '../styles/components/social-networks.css'
import '../styles/components/hero.css'
import '../styles/components/career.css'
import '../styles/components/projects.css'
import '../styles/components/contact.css'
import '../styles/components/footer.css'
import '../styles/utils.css' // Should be the last

import mobileNav from './utils/mobile-nav';
import writeSubFunction from './utils/typewriter'
import { changeCardVisibility, addDelayToSkill } from './utils/projects'

mobileNav();
writeSubFunction();
changeCardVisibility();
addDelayToSkill();
