function scrolling(){
    function traseScroll(){

        // Scrolling with raf
       
        let links = document.querySelectorAll('[href^="#"]'), //  берем все ссылкы которые начинаются с href пример: <a href="#up" class="pageup">
        speed = 0.3;  // скорость анимации
       
        links.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                let widthTop = document.documentElement.scrollTop, // устанавливает количество пикселей, 
                // на которое была прокручена страница в вертикальном направлении, 
                // от верхней границы окна браузера до верхней границы видимой области документа.
                    hash = this.hash, // ссылка на которой происходит действие
                    toBlock = document.querySelector(hash).getBoundingClientRect().top,// получаем верхние координаты нашего элемента
                    start = null; // стартовая позиция
                    

                requestAnimationFrame(step);
                // мы используем метод requestAnimationFrame() для плавного скроллинга 
                // страницы к целевому элементу. Мы определяем функцию step(), 
                // которая вызывается каждый раз, когда браузер готов отрисовать новый кадр.

                function step(time) {
                    if (start === null) {// первый ли раз запускается анимация
                        start = time;
                    }

                    let progress = time - start; // используется для вычисления времени, 
                    // прошедшего с момента установки переменной start.
                        // r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));
                    let r;
                    if (toBlock < 0) {
                        r = Math.max(widthTop - progress/speed, widthTop + toBlock);
                    } else {
                        r = Math.min(widthTop + progress/speed, widthTop + toBlock);
                    }
                     // количество px которые нужно пролистнуть в течении анимации

                       
                    document.documentElement.scrollTo(0, r);// координаты куда мы будем листать. 1-аргумент по x 2-аргумент по y

                    if (r != widthTop + toBlock) {
                        requestAnimationFrame(step);
                    } else {
                        location.hash = hash;
                    }
                    // останавливает анимацию
                }
            });
        });
    }
    traseScroll();
}
export default scrolling;