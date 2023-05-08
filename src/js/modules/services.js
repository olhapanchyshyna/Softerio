function services(btnsSelector, itemTextSelector) {
    const btns = document.querySelectorAll(btnsSelector);
    const itemText = document.querySelectorAll(itemTextSelector);
    const items = document.querySelectorAll('.services__item');
  
    function hideItem() {
      itemText.forEach((item) => {
        item.style.display = 'none';
        item.classList.add('animate__fadeOut');
      });
    }
  
    hideItem();
  
    btns.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            const indexBtn = btn.dataset.index;
            const item = document.querySelector(`[data-text="${indexBtn}"]`);
            const itemParent = item.closest('.services__item');
  
            // если блок уже открыт, то скрываем его
            if(item.style.display === 'block') {
                item.classList.add('animate__fadeOut');
                item.classList.remove('animate__fadeIn');
                setTimeout(()=>{
                    item.style.display = 'none';
                    itemParent.style.height = '310px';
                },1000)
            }else{
                // скрываем все блоки и показываем нужный
                hideItem();
        
                items.forEach((item) => {
                    item.style.height = '310px';
                });
    
                itemText.forEach((item) => {
                    item.classList.add('animate__fadeIn');
                    item.classList.remove('animate__fadeOut');
                    itemParent.classList.add('animate__fadeIn');
                    if (item.dataset.text === indexBtn) {
                        item.style.display = 'block';
                        itemParent.style.height = '100%';
                       
                    }
                });
            }
        });
    });
}
export default services;


