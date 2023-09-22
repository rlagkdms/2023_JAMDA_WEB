

const Day = new Date();
const todayMonth = Day.getMonth();
const todayYear = Day.getFullYear();
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let colorTheme;
// let stemp
let dayCnt = new Date(Day.getFullYear(), Day.getMonth() + 1, 0).getDate();
let stempDay = new Array(dayCnt+1);

let monthView = document.getElementsByClassName("month")[0];
let yearView = document.getElementsByClassName("year")[0];
monthView.innerText = month[todayMonth];
yearView.innerText = todayYear;

window.onload = function () {
    buildCalendar();
    buildChart();
    
}    // 웹 페이지가 로드되면 buildCalendar 실행

let nowMonth = new Date();  // 현재 달을 페이지를 로드한 날의 달로 초기화
let today = new Date();     // 페이지를 로드한 날짜를 저장
// today.setHours(0,0,0,0);    // 비교 편의를 위해 today의 시간을 초기화

// 달력 생성 : 해당 달에 맞춰 테이블을 만들고, 날짜를 채워 넣는다.
function buildCalendar() {

    let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);     // 이번달 1일
    let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);  // 이번달 마지막날

    let tbody_Calendar = document.querySelector(".Calendar > tbody");


    let nowRow = tbody_Calendar.insertRow();        // 첫번째 행 추가

    for (let j = 0; j < firstDate.getDay(); j++) {  // 이번달 1일의 요일만큼
        let nowColumn = nowRow.insertCell();        // 열 추가

    }

    for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {   // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복

        let nowColumn = nowRow.insertCell();        // 새 열을 추가하고
        nowColumn.innerText = leftPad(nowDay.getDate());      // 추가한 열에 날짜 입력
        nowColumn.className = "date";


        if (nowDay.getDay() == 6) {                 // 토요일인 경우 글자색 파랑으로 하고
            nowRow = tbody_Calendar.insertRow();    // 새로운 행 추가
        }else if(nowDay.getDay() == 0){
            nowColumn.style.color = "#DC143C";
        }

    }
    getCompleteDate();
}


function buildMonthlyRecord(){
    let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);  // 이번달 마지막날

    const exerciseDay = document.getElementsByClassName("stemp").length;
    const finishExercise = Math.round((exerciseDay / lastDate.getDate() * 100));
    if(exerciseDay <= 0) document.getElementsByClassName("exercise-graph")[0].style.width = `0px`;
    else document.getElementsByClassName("exercise-graph")[0].style.width = `calc(7% + (${exerciseDay} / ${lastDate.getDate()} * 93%))`;
    document.getElementsByClassName("exercise-date")[0].innerText = `${exerciseDay}일`;
    document.getElementsByClassName("month-date")[0].innerText = `${lastDate.getDate()-exerciseDay}일`;
    document.getElementsByClassName("finish-exercise")[0].innerText = `이번 달 운동 완료일은 ${finishExercise}%입니다.`
}

function buildChart(){
    //https://lts0606.tistory.com/297
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    var width = canvas.clientWidth;
    var height = canvas.clientHeight;

    var value = [
        {number : 2100, text : '스쿼트'},
        {number : 1350, text : '러닝'},
        {number : 2180, text : '플랭크'},
        {number : 1440, text : '런지'},
        {number : 1160, text : '비피'}
    ];

    var total = 0;
    value.forEach( (arg)=> total+=arg.number);

    var percent = [];
    for(let i in value){
        percent[i] = Math.round(value[i].number / total * 100);
    }


    var degree = 360;
    var radius = width * 0.7 / 2;  //반지름 동적 부여

    if(radius > height * 0.7 / 2){  //캔버스의 넓이와 높이를 고려하여 최소크기 적용
        radius = height * 0.7 / 2;
    }

    const colorArray = ['#FFD4D4', '#D62525', '#FF1515','#FF5555','#FF9292','#FFE0E0', '#FFC2C2', '#FFA3A3', '#FF6666'];  //색깔배열(지금은 6개..)
    const colorPlus = '#CC5252';
    colorLength = colorArray.length;

    let toggle = new Array(value.length);

    var sum = 0;
    value.forEach( arg=> sum+= arg.number);

    var conv_array = value.slice().map((data)=>{  //각도가 들어있는 배열
        var rate = data.number / sum;
        var myDegree = degree * rate;
        return myDegree;
    });

    degree = 0;
    var event_array = value.slice().map( arg=> []);  //이벤트(각도 범위가 있는)용 배열

    var current = -1;  //현재 동작중 인덱스
    var zero = 0;   //각(degree)에 대해서 증가하는 값

    for(var k = 0; k<150; k++){
        for(var i=0;i < conv_array.length;i++){
            var item = conv_array[i];
            let color = colorArray[i];
            if(i != 0 && i % colorLength == 0) color = colorPlus;
            else color = colorArray[i % colorLength];
            if(current == -1|| current == i){
                current = i;
                if(zero < item){ //비교
                    if(i == 0){
                        arcMaker(radius, 0, zero, color);
                    } else {
                        arcMaker(radius, degree, degree+zero, color);
                    }
                    zero+=3;
                } else {
                    current = i+1;
                    zero = 0;
                    if(i != 0){
                        arcMaker(radius, degree, degree + item, color);
                        event_array[i] = [degree, degree+item];
                        degree =  degree + item;
                    } else {
                        arcMaker(radius, 0, item, color);
                        degree = item;
                        event_array[i] = [0, degree];
                    }
                }
            }

        }
    }

    //그리는 기능 분리(같은 내용이 계속 나오므로 분리)
    function arcMaker(radius, begin, end, color){
        ctx.save();
        ctx.lineJoin = 'round'; //선이만나 꺾이는 부분때문에 부여(삐져나오는 현상 방지)
        ctx.beginPath();
        ctx.moveTo(width/2, height/2);
        ctx.arc(width/2, height/2, radius, (Math.PI/180)*begin, (Math.PI/180)* end , false);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        middelMaker();  //가운데 원형그리기 함수 추가
    }

    //마우스 움직임 이벤트 리스너
    var drawed = false;
    canvas.addEventListener('click', function (event) {
        var x1 = event.offsetX;
        var y1 = event.offsetY;
        var inn = isInsideArc(x1, y1);
        if(inn.index > -1){  //대상이 맞으면
            drawed = true;
            hoverCanvas(inn.index);
            makeText(inn.index);
        }
    });

    //내부 + 범위에 들어온지 확인하는 함수
    function isInsideArc(x1, y1){
        var result1 = false;
        var result2 = false;
        var index = -1;
        var circle_len = radius;
        var x = width/2 - x1;
        var y = height/2 - y1;
        var my_len = Math.sqrt(Math.abs(x * x) + Math.abs(y * y));  //삼각함수
        if(circle_len >= my_len){
            result1 = true;
        }
        var rad = Math.atan2(y, x);
        rad = (rad*180)/Math.PI;  //음수가 나온다
        rad += 180;  //캔버스의 각도로 변경
        if(result1){
            event_array.forEach( (arr,idx) => {   //각도 범위에 해당하는지 확인
                if( rad >= arr[0] && rad <= arr[1]){
                    result2 = true;
                    index = idx;
                }
            });
        }
        return {result1:result1, result2:result2 ,index:index, degree : rad};
    }

    let beforeIndex = -1;

    //마우스 오버효과
    function hoverCanvas(index){
        ctx.clearRect(0,0,width, height);
        for (var i = 0; i < conv_array.length; i++) {
            var item = conv_array[i];
            var innRadius = radius;
            let color = colorArray[i];
            if(i != 0 && i % colorLength == 0) color = colorPlus;
            else color = colorArray[i % colorLength];
            if(index == i){
                // 0, undefined => 1.1
                // 1 => 1
                if(beforeIndex !== i){
                    if(toggle[beforeIndex] === 1) toggle[beforeIndex] = 0;
                    beforeIndex = i;
                }
                if(toggle[i] != 1){
                    innRadius = radius * 1.1;  //대상이 맞으면 1.1배 크게 키운다.
                    toggle[i] = 1;
                }else{
                    innRadius = radius * 1;
                    toggle[i] = 0;
                }
            }
            if (i == 0) {
                arcMaker(innRadius, 0, item, color)
                degree = item;
            } else {
                arcMaker(innRadius, degree, degree + item, color)
                degree = degree + item;
            }
        }
    }


    //도(degree)를 라디안(radian)으로 바꾸는 함수
    function degreesToRadians(degrees) {
        const pi = Math.PI;
        return degrees * (pi / 180);
    }

    //텍스트함수
    function makeText(index){
        event_array.forEach((itm, idx) => {
            var xx = width / 2;
            var yy = height / 2;

            var txt = value[idx].text;
            var num = `${percent[idx]}%`;
            // var minus = ;  //텍스트 절반길이
            ctx.save();
            if(index == idx){
                if(toggle[idx] === 1){
                    ctx.font = "normal 16px Roboto";
                    ctx.fillStyle = '#000000';
                    ctx.fillText(txt, xx - ctx.measureText(txt).width / 2, yy);
                    ctx.fillText(num, xx - ctx.measureText(num).width / 2, yy + 16);
                }
            }
            ctx.restore();
        });
    }

    //중앙 구멍(원)을 만드는 함수
    function middelMaker(){
        ctx.save();
        ctx.fillStyle='white';
        ctx.strokeStyle='white';
        ctx.lineJoin = 'round'; //선이만나 꺾이는 부분때문에 부여(삐져나오는 현상 방지)
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(width/2, height/2);
        ctx.arc(width/2, height/2, radius/2, (Math.PI/180)*0, (Math.PI/180)* 360 , false);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
}

 //input값이 한자리 숫자인 경우 앞에 '0' 붙혀주는 함수
function leftPad(value) {
    if (value < 10) {
        value = "0" + value;
        return value;
    }
    return value;
}

function btnOpen(){
    const colorPicker = document.getElementsByClassName('color-picker')[0];
    const colorPick = document.getElementById('clr-picker');
    colorPicker.style.visibility = 'visible';
    colorPick.style.visibility = 'visible';
    document.getElementById('pick').click();
    const colorEditor = document.getElementById('btn-close');

    colorEditor.after(colorPick);
}

function btnClose(){
    const colorPicker = document.getElementsByClassName('color-picker')[0];
    const colorPick = document.getElementById('clr-picker');
    colorPick.style.visibility = 'hidden';
    colorPicker.style.visibility = 'hidden';

    // colorPicker 색 코드
    let colorValue = document.getElementsByClassName('clr-color')[0].value;
    const userid = localStorage.getItem("userid");
    
    // 서버로 GET 요청을 보냅니다.
    axios.post('http://52.78.221.233:3000/users/updateColor', {
        userid : userid,
        color : colorValue
    })
      .then((response) => {
        console.log("색상을 추가하였습니다.");
        

        getColor();
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // 오류 처리를 추가하세요.
    });
   
}

function getColor(){
    const token = localStorage.getItem("token");

    axios.get('http://52.78.221.233:3000/users/getColor', {
        headers: {
            Authorization: token // 토큰을 헤더에 포함
        }
      })
      .then((response) => {
        const color = response.data.color;
        var stemp = document.getElementsByClassName("stemp");
        var picker = document.getElementById('pick');
        picker.value = color;
        for(var i = 0; i<stemp.length; i++){
            stemp[i].style.color = color;
        }
        console.log('캘린더 색상:', color);
      })
      .catch((error) => {
        console.error('캘린더 색상을 가져오는 중 오류:', error);
      });
}

function getCompleteDate(){
    const token = localStorage.getItem("token");
    checkDate = document.getElementsByClassName('date');

    axios.get('http://52.78.221.233:3000/users/getCompleteDate', {
        headers: {
            Authorization: token // 토큰을 헤더에 포함
        }
      })
      .then((response) => {
        const completeDate = response.data.completedate;
        let stempDateList = [];
        let KR_TIME_DIFF = 9 * 60 * 60 * 1000;
        for(let i in completeDate){
            let Year = completeDate[i].substr(0, 4);
            let month = completeDate[i].substr(5, 2);
            let day = completeDate[i].substr(8, 2);
            let hour = completeDate[i].substr(11, 2);
            let minute = completeDate[i].substr(14, 2);
            let second = completeDate[i].substr(17, 2);

            let lastComplete = new Date(Date.UTC(Year, month, day, hour, minute, second));
            let kr_curr = new Date(lastComplete + (KR_TIME_DIFF));
            if(stempDateList[stempDateList.length - 1] != kr_curr.getDate()){
                stempDateList.push(kr_curr.getDate());
            }
        }
        for(let i in stempDateList){
            checkDate[stempDateList[i] - 1].innerHTML += `<br><div class="stemp"><iconify-icon icon="gg:check-o"></iconify-icon></div>`;
        }
        
        getColor();
        buildMonthlyRecord();
      })
      .catch((error) => {
        console.error('날짜를 불러오는 중 오류:', error);
      });
}












