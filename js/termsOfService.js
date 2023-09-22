var checkbox = document.getElementsByClassName('checkbox');
let button = document.querySelector('button');
function checkTerm(e){
    e.target.classList.toggle('checkbox-toggle');
    if(e.target == checkbox[0]){
        for(box of checkbox)
          if(!(box.classList.contains('checkbox-toggle'))) box.classList.toggle('checkbox-toggle');  
    }

    if(checkbox[1].classList.contains('checkbox-toggle') &&
        checkbox[2].classList.contains('checkbox-toggle')){
        checkbox[0].classList.add('checkbox-toggle');
        button.style.backgroundColor = 'rgba(255, 102, 102, 1)';
    }
    else checkbox[0].classList.remove('checkbox-toggle');
}
button.onclick = function (){
    if(checkbox[0].classList.contains("checkbox-toggle") &&
        checkbox[1].classList.contains("checkbox-toggle") &&
        checkbox[2].classList.contains("checkbox-toggle")){
        location.href = '../html/startingProfileSet.html';
    }
}
