
import hamburger from './modules/hamburger';
import services from './modules/services';
import sliders from './modules/sliders';
import moreInformation from './modules/moreInformation';
import scrolling from './modules/scrolling';

window.addEventListener('DOMContentLoaded', () =>{
    hamburger('.contact__icons-menu', '.contact__icons-close', '.contact__list', '.contact__information');
    services('.services__item-button', '.services__item-text');
    sliders();
    moreInformation();
    scrolling();
})  