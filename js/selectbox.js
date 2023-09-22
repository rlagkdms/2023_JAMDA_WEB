const label = document.querySelectorAll('.label');

 // 옵션 클릭시 클릭한 옵션을 넘김 
label.forEach(function(lb){
    lb.addEventListener('click', e => {
        let optionList = lb.nextElementSibling;
        let optionItems = optionList.querySelectorAll('.optionItem');
        
        clickLabel(lb, optionItems);
    })
});
// 라벨을 클릭시 옵션 목록이 열림/닫힘
const clickLabel = (lb, optionItems) => {
    if(lb.parentNode.classList.contains('active')) {
        lb.parentNode.classList.remove('active');
        lb.nextElementSibling.classList.remove('optionDiv');

        optionItems.forEach((opt) => {
            opt.removeEventListener('click', () => {
                handleSelect(lb, opt)
            })
        })
    }else {
        lb.parentNode.classList.add('active');
        lb.nextElementSibling.classList.add('optionDiv');
        
        optionItems.forEach((opt) => {
            opt.addEventListener('click', () => {
                handleSelect(lb, opt)
            })
        })
    }
}

// 클릭한 옵션의 텍스트를 라벨 안에 넣음
const handleSelect = (label, item) => {
    label.innerHTML = item.textContent;

    if(label.innerHTML !=='직접입력'){
    label.innerHTML += '<img src="../image/ep_arrow-up.svg"/>';
    }
    else{
        label.innerHTML = '<input type="text"/> <img src="../image/ep_arrow-up.svg"/>';
        for (const btn of document.getElementsByClassName('label')) {
            if(label.innerHTML = '<input type="text"> <img src="../image/ep_arrow-up.svg">'){
                console.log(label.childNodes);
                label.firstChild.focus();
                console.log(label.firstChild);
            }
            else{
                lb.firstChild.blur();
            }
          } 
    }
    label.parentNode.classList.remove('active');
    label.nextElementSibling.classList.remove('optionDiv');
}