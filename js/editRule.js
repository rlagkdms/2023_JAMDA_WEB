let addAlertDiv = document.getElementsByClassName('alert')[0];
let addAlertTitle = document.getElementsByClassName('alert-title')[0];

let likeDo, exerciseTitle, exerciseRule, exerciseUnit, count_min, count_max,baseExerCount;

var favorite_act = document.getElementById('activity');
var exer_select = document.getElementsByClassName('label')[0];
var exer_nums = document.getElementById('activity_num');
var exer_unit = document.getElementsByClassName('label')[1];
var exer_min = document.getElementById('count_min');
var exer_max = document.getElementById('count_max');

let listUuid = localStorage.getItem('uuid') //uuid 값 string 형태로 받아서 배열 형태로 바꿈 
console.log(listUuid); 

favorite_act.addEventListener('input',()=>{
  favorite_act.maxLength = 8; 
  if(favorite_act.value.length >=8){
    console.log(favorite_act.value)
    addAlertDiv.style.visibility = "visible";
    addAlertTitle.innerText = '최대 8글자까지 입력할 수 있습니다';
  }
});

//초기값 넣는 함수 
function firstInput(){
  favorite_act.value =likeDo;
  exer_select.textContent = exerciseTitle;
  exer_nums.value = exerciseRule;
  exer_unit.textContent  = exerciseUnit;
  exer_min.value = count_min;
  exer_max.value = count_max;
}

function getAllRulesByUuid() {
  axios
  .post("http://52.78.221.233:3000/users/getAllRulesByUuid", {
      uuid: listUuid    
  })
  .then((response) => {
      likeDo = response.data.activity;
      exerciseTitle = response.data.exercise;
      exerciseRule = response.data.activityNum;
      exerciseUnit = response.data.unit;
      count_min = response.data.count_min;
      count_max = response.data.count_max;
      baseExerCount = response.data.count;
      uuid = response.data.uuid;
      firstInput();
  })
  .catch((e) => {
      console.log(err);
  });
} 

getAllRulesByUuid();

// 규칙을 불러오는 함수
function fetchRules() {
  const token = localStorage.getItem("token");
  
  axios.get('http://52.78.221.233:3000/users/getRules', {
      headers: {
          Authorization: token // 토큰을 헤더에 포함   
      }
  })
  .then((response) => {
      likeDo = response.data.activity;
      exerciseTitle = response.data.exercise;
      exerciseRule = response.data.activityNum;
      exerciseUnit = response.data.unit;
      count_min = response.data.count_min;
      count_max = response.data.count_max;
      baseExerCount = response.data.count;
  })
  .catch((error) => {
      console.error('Error fetching data:', error);
      // 오류 처리를 추가하세요.
      // 예: showError(error);
  });
}
fetchRules();

function updateRules() {  // 이거 아침에 물어보기 
  axios
  .post("http://52.78.221.233:3000/users/updateRules", {
     
      uuid: listUuid,
      activity: favorite_act.value,
      exercise: exer_select,
      activity_num: exer_nums.value,
      unit: exer_unit,
      count_min: exer_min.value,
      count_max: exer_max.value                 
  })
  .then((response) => {
    console.log("규칙이 변경되었습니다.");

  })
  .catch((e) => {
      console.log(err);
  });
} 

//변경값 
function addRuleAndBack() {
  if (exer_select.innerHTML == '<input type="text"> <img src="../image/ep_arrow-up.svg">') {
      exer_select = exer_select.firstChild.value;
  } else {
      exer_select = exer_select.textContent;
  }
  if (exer_unit.innerHTML == '<input type="text"> <img src="../image/ep_arrow-up.svg">') {
      exer_unit = exer_unit.firstChild.value;
  } else {
      exer_unit = exer_unit.textContent;
  }
  

  if (favorite_act.value.length === 0) {
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
  console.log(favorite_act.value);
  console.log(exer_select);
  console.log(exer_nums.value);
  console.log(exer_unit);
  console.log(exer_min.value);
  console.log(exer_max.value);
  
  updateRules();
}


// 규칙을 불러오는 함수
function fetchRules() {
  const token = localStorage.getItem("token");
  
  axios.get('http://52.78.221.233:3000/users/getRules', {
      headers: {
          Authorization: token // 토큰을 헤더에 포함   
      }
  })
  .then((response) => {
      likeDo = response.data.activity;
      exerciseTitle = response.data.exercise;
      exerciseRule = response.data.activityNum;
      exerciseUnit = response.data.unit;
      count_min = response.data.count_min;
      count_max = response.data.count_max;
      baseExerCount = response.data.count;
 
  })
  .catch((error) => {
      console.error('Error fetching data:', error);
      // 오류 처리를 추가하세요.
      // 예: showError(error);
  });
}

fetchRules();
 
function updateRules() {  // 이거 아침에 물어보기 
  axios
  .post("http://52.78.221.233:3000/users/updateRules", {
      uuid: listUuid,
      activity: favorite_act.value,
      exercise: exer_select,
      activity_num: exer_nums.value,
      unit: exer_unit,
      count_min: exer_min.value,
      count_max: exer_max.value                 
  })
  .then((response) => {
      
    console.log("규칙이 변경되었습니다.");

  })
  .catch((e) => {
      console.log(err);
  });
} 

function back(){
  window.location.href = "./rule.html";
}
function alertCheck(){
  addAlertDiv.style.visibility = "hidden";
}
