function sliders(){
    
    function slider(slidesItem, sliderWrapperSelector, slidesFiledSelector, sliderSelector, dotSelector) {
        const slides = document.querySelectorAll(slidesItem);
        const sliderWrapper = document.querySelector(sliderWrapperSelector);
        const slidesFiled = document.querySelector(slidesFiledSelector);
        const slider = document.querySelector(sliderSelector);
        const dots = document.querySelectorAll(dotSelector);
        let slideIndex = 1;
        let offset = 0;
      
        stepSlider();
      
        window.addEventListener('resize', () => {
            stepSlider();
        });
      
        function stepSlider() {
          const width = sliderWrapper.clientWidth + 'px';
      
          if (window.innerWidth <= 1060) {
                slidesFiled.style.position = 'relative';
                slidesFiled.style.display = 'flex';
                slidesFiled.style.transition = '0.5s all';
                sliderWrapper.style.overflow = 'hidden';

                slides.forEach(item => {
                    item.style.width = width;
                });

                slidesFiled.style.width = 100 * slides.length + '%';
                showDots();

                dots.forEach(dot => {
                    dot.addEventListener('click', (e) => {
                        const slideTo = e.target.getAttribute('data-slide-to');
                        slideIndex = slideTo;

                        offset = parseInt(width) * (slideTo - 1);

                        slidesFiled.style.transform = `translateX(-${offset}px)`;

                        dots.forEach(dot => {
                            dot.style.opacity = '.5';
                        });
                        dots[slideIndex - 1].style.opacity = 1;
                    });
                });

            } else if(window.innerWidth >= 577){
                slidesFiled.style.display = 'flex';
                slides.forEach(item => {
                    item.style.width = '';
                });
                slidesFiled.style.width = '';
                slidesFiled.style.transform = '';
                slidesFiled.style.transition = '';
                sliderWrapper.style.overflow = '';
          }
        }
      
        function showDots(i = 0) {
          dots[i].style.opacity = 1;
        }
      }
      
      slider('.price__item', '.price__footer', '.price__list', '.price', '.price .dot');
      slider('.services__item', '.services__footer', '.services__list', '.services', '.services .dot');

}
export default sliders;