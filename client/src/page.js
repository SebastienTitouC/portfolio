import '../styles/modern-normalize.css' // Should be the first
import '../styles/fonts.css'
import '../styles/style.css'
import '../styles/components/header.css'
import '../styles/components/hero.css'
import '../styles/components/articles.css'
import '../styles/components/footer.css'
import '../styles/utils.css' // Should be the last

import mobileNav from './utils/mobile-nav';
import { changeTheme } from './utils/dark-mode'
import { fetchArticles, addCategoryFilter, displayFilterMenu } from './utils/articles'

mobileNav();
changeTheme();
fetchArticles();
addCategoryFilter();
displayFilterMenu();
