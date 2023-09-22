var accumlate = [];
var accumlate_sum = 0;
var nowCount_sum = 0;

/* do-exer */
let circleChart = document.getElementsByClassName('pie')[0];
let innerPercent = document.getElementsByClassName('complete-percent')[0];


// window.onload = function() {
    getCount();
    
// }
// fetchRules();

// 규칙을 불러오는 함수
// function fetchRules() {
function fetchRules() {
    const token = localStorage.getItem("token");

    axios.get('http://52.78.221.233:3000/users/getRules', {
        headers: {
            Authorization: token 
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
        uuid = response.data.uuid;
    
        for(let i in count_min){
            accumlate[i] = goalDataList[i] + (baseExerCount[i] * (Number)(exerciseRule[i]));
            accumlate_sum += accumlate[i];
          }

        makeDoExercise();
        getNowCount();

        return uuid;

    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
}
    
function getCount(){
    const userid = localStorage.getItem("userid");
    axios.post('http://52.78.221.233:3000/users/getTodayCount', {
          userid : userid
      })
      .then((response) => {
        goalDataList = response.data.today_count;
        fetchRules();
      })
      .catch((error) => {
        console.error('날짜를 불러오는 중 오류:', error);
      });
}
function getNowCount() {
    const userid = localStorage.getItem("userid");
  
    axios
    .post("http://52.78.221.233:3000/users/getNowCount", {
        userid : userid  
    })
    .then((response) => {
        nowCount = response.data.complete_count;
        nowCount_sum = nowCount.reduce((a, c) => a + c);
        getPercent();
    })
    .catch((e) => {
        console.log(e);
    });
  }

function goExercise(){
    window.location.href = "../html/exercise.html";
} 

function getPercent(){
    let percent = Math.round(nowCount_sum / accumlate_sum * 100);
    console.log(nowCount_sum, accumlate_sum, percent);
    circleChart.style.setProperty('--p', percent);
    innerPercent.innerText = `${percent}%`
}




var likeDo = [];
var exerciseTitle = [];
var exerciseRule = [];
var exerciseUnit = [];
var baseExerCount = [];
var uuid = '';



let recordExerDiv = document.getElementsByClassName('record-exercise')[0];
let exerKindDiv = document.getElementsByClassName('exer-kind-div')[0];

function makeDoExercise() {
    var divHeight = Math.ceil(likeDo.length / 2) * 100 + (Math.ceil(likeDo.length / 2) - 1) * 16;
  
    recordExerDiv.style.height = `calc(${divHeight}px + 80px)`;
    exerKindDiv.style.height = `${divHeight}px`;
    for(let i in likeDo){
        var exerDiv = document.createElement('div');
        exerDiv.className = "exer-div";
        exerDiv.style.width = "140px";
        exerDiv.style.height = "100px";

        var exerNameDiv = document.createElement('div');
        var exerTitle = document.createElement('div');
        var exerCount = document.createElement('div');
        var exerUnit = document.createElement('div');
        exerNameDiv.className = "exer-name-div";
        exerTitle.className = "exer-title";
        exerCount.className = "exer-count";
        exerUnit.className = "exer-unit";
        exerTitle.innerText = `${exerciseTitle[i]}`;
        exerCount.innerText = `${exerciseRule[i]}`;
        exerUnit.innerText = `${exerciseUnit[i]}`;
        exerNameDiv.appendChild(exerTitle);
        exerNameDiv.appendChild(exerCount);
        exerNameDiv.appendChild(exerUnit);

        var likePromise = document.createElement('div');
        likePromise.innerText = `${likeDo[i]}`;
        likePromise.className = "like-promise";

        var doCountDiv = document.createElement('div');
        // var doCountMinus = document.createElement('div');
        var doCountNum = document.createElement('div');
        // var doCountPlus = document.createElement('div');
        doCountDiv.className = 'do-count';
        // doCountMinus.className = 'do-count-minus';
        doCountNum.className = 'do-count-num';
        // doCountPlus.className = 'do-count-plus';
        // doCountMinus.innerHTML = `<iconify-icon icon="radix-icons:minus" class="do-count-minus"></iconify-icon>`;
        doCountDiv.innerHTML += `<iconify-icon icon="radix-icons:minus" class="do-count-minus"></iconify-icon>`;
        doCountNum.innerText += `${baseExerCount[i]}`;
        doCountDiv.appendChild(doCountNum);
        doCountDiv.innerHTML += `<iconify-icon icon="iconoir:plus" class="do-count-plus"></iconify-icon>`;
        // doCountPlus.innerHTML = `<iconify-icon icon="iconoir:plus" class="do-count-plus"></iconify-icon>`;
        // doCountDiv.appendChild(doCountMinus);
        // doCountDiv.appendChild(doCountPlus);

        exerDiv.appendChild(exerNameDiv);
        exerDiv.appendChild(likePromise);
        exerDiv.appendChild(doCountDiv);

        exerKindDiv.appendChild(exerDiv);

    }
}

recordExerDiv.addEventListener('click', function(event){
    let doCount = document.getElementsByClassName('do-count');
// console.log(exerDiv);
    if(event.target.className === "do-count-minus" && event.target.parentElement.children[1].innerText >= 1){
        for(let i in doCount){
            if(doCount[i] === event.target.parentElement){
                event.target.parentElement.children[1].innerText--; 
                decreaseCount(uuid[i]);       
            }
        }
    }else if(event.target.className === "do-count-plus"){
        for(let i in doCount){
            if(doCount[i] === event.target.parentElement){
                event.target.parentElement.children[1].innerText++;   
                increaseCount(uuid[i]);         
            }
        }
    }
});

function increaseCount(uuid) {
    axios
    .post("http://52.78.221.233:3000/users/increaseCount", {
        uuid: uuid    
    })
    .then((response) => {
    })
    .catch((e) => {
        console.log(err);
    });
}  

function decreaseCount(uuid) {
    axios
    .post("http://52.78.221.233:3000/users/decreaseCount", {
        uuid: uuid    
    })
    .then((response) => {
    })
    .catch((e) => {
        console.log(err);
    });
} 

/* record-exer */
function goHowExercise(){
    window.location.href="./howExercise.html"
}