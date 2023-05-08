function moreInformation(){

    // window.addEventListener('resize', () => {
        
    // });

    function showInformation(btnSelector,itemsSelector){
        if (window.innerWidth <= 1060){
            const   btn = document.querySelector(btnSelector),
                    items = document.querySelectorAll(itemsSelector);


            items.forEach(item => {
                item.style.display = 'none';
                document.querySelector('.development-stages__button').style.display = 'none';
            })

            items[0].style.display = 'block'

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                items.forEach(item => {
                    item.style.display = 'block';
                    document.querySelector('.development-stages__button').style.display = 'block';
                })
                btn.style.display = 'none';
            })
        }
        // if(window.innerWidth >= 1061){
        //     btn.style.display = 'none';
        // }
        
    }
    showInformation('.hideBtn', '.development-stages__item');
}
export default moreInformation;