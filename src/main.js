import '../styles/modern-normalize.css' // Should be the first
import '../styles/fonts.css'
import '../styles/style.css'
import '../styles/components/header.css'
import '../styles/components/hero.css'
import '../styles/utils.css' // Should be the last

import nav from './utils/nav';
import mobileNav from './utils/mobile-nav';

nav();
mobileNav();