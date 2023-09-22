

let addAlertDiv = document.getElementsByClassName('alert')[0];
let addAlertTitle = document.getElementsByClassName('alert-title')[0];

var favorite_act = document.getElementById('activity');
var exer_select = document.getElementsByClassName('label')[0];
var exer_nums = document.getElementById('activity_num');
var exer_unit = document.getElementsByClassName('label')[1];
var exer_min = document.getElementById('count_min');
var exer_max = document.getElementById('count_max');

favorite_act.addEventListener('input', () => {
  favorite_act.maxLength = 8; 
  if(favorite_act.value.length >=8){
    console.log(favorite_act.value)
    addAlertDiv.style.visibility = "visible";
    addAlertTitle.innerText = '최대 8글자까지 입력할 수 있습니다';
  }
});

function addRuleAndBack() {
  if (exer_select.innerHTML == '<input type="text"> <img src="../image/ep_arrow-up.svg">') {
      exer_select = exer_select.firstChild.value;
  } else {
      exer_select = exer_select.innerText;
  }

  if (exer_unit.innerHTML == '<input type="text"> <img src="../image/ep_arrow-up.svg">') {
      exer_unit = exer_unit.firstChild.value;
  } else {
      exer_unit = exer_unit.innerText;
  }

  console.log(favorite_act.value);
  console.log(exer_select);
  console.log(exer_nums.value);
  console.log(exer_unit);
  console.log(exer_min.value);
  console.log(exer_max.value);

  if (favorite_act.value.length === 0) {
    //   alert('최애의 행동을 입력해주세요!');
    addAlertDiv.style.visibility = "visible";
    addAlertTitle.innerText = '최애의 행동을 입력해주세요!';
      return 0;
  }
  if (exer_select.length === 0 || exer_select == "운동") {
    addAlertDiv.style.visibility = "visible";
    addAlertTitle.innerText = '운동을 선택해주세요!';
      return 0;
  }
  if (exer_nums.value.length === 0) {
    addAlertDiv.style.visibility = "visible";
    addAlertTitle.innerText = '운동 횟수를 입력해주세요!';
      return 0;
  }
  if(isNaN(exer_nums.value)){
    addAlertDiv.style.visibility = "visible";
    addAlertTitle.innerText = '운동 횟수를 다시 입력해주세요!';
    return 0;
  }
  if (exer_unit.length === 0 || exer_unit == "단위") {
    addAlertDiv.style.visibility = "visible";
    addAlertTitle.innerText = '운동 단위를 입력해주세요!';
      return 0;
  }
  if (exer_min.value.length === 0) {
    addAlertDiv.style.visibility = "visible";
    addAlertTitle.innerText = '최솟값을 입력해주세요!';
      return 0;
  }
  if (exer_max.value.length === 0) {
    addAlertDiv.style.visibility = "visible";
    addAlertTitle.innerText = '최댓값 입력해주세요!';
      return 0;
  }
  if(isNaN(exer_min.value)){
    addAlertDiv.style.visibility = "visible";
    addAlertTitle.innerText = '최솟값을 다시 입력해주세요!';
    return 0;
  }

  if (exer_min.value > exer_max.value || isNaN(exer_max.value)) {
    addAlertDiv.style.visibility = "visible";
    addAlertTitle.innerText = '최댓값을 다시 입력해주세요!';
    return 0;
  }

  const id = localStorage.getItem("userid");

  // 서버로 데이터 전송
  axios.post("http://52.78.221.233:3000/users/rules", {
          userid: id,
          activity: favorite_act.value,
          exercise: exer_select,
          activity_num: exer_nums.value,
          unit: exer_unit,
          count_min: exer_min.value,
          count_max: exer_max.value
      }).then((response) => {
          console.log("rules add successful!");
          addAlertDiv.style.visibility = "visible";
          addAlertTitle.innerText = "규칙이 추가 되었습니다.";
          
          // alert("규칙이 추가 되었습니다.");
          addAlertDiv.style.visibility = "visible";
          addAlertTitle.innerText = '규칙이 추가 되었습니다.'
          window.location.href = "/html/rule.html";
      }).catch((error) => {
          console.error("Error adding rule:", error);
          // alert("규칙 추가 중 오류가 발생했습니다.");
          addAlertDiv.style.visibility = "visible";
          addAlertTitle.innerText = '규칙 추가 중 오류가 발생했습니다.'

      });

}


function back(){
  window.location.href = "./rule.html";
}

function alertCheck(){
  if(addAlertTitle.innerText == "규칙이 추가 되었습니다."){
    window.location.href = "../html/rule.html";
  }
  addAlertDiv.style.visibility = "hidden";

}