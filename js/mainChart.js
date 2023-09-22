const ctx = document.getElementById('myChart');
const context = document.getElementById('myChart').getContext('2d');

let standard = 45;

Chart.defaults.color = '#B3B3B3';
Chart.defaults.font.family = 'Noto Sans KR';
Chart.defaults.font.size = 10;
var labelData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
var dataGroup = [49, 50, 49.2, 49, 48.1, 47.9, 47];
var interval = 1;
var maxNum = Math.max(...dataGroup);
var minNum = Math.min(...dataGroup);
// console.log(maxNum);
// console.log(minNum);
if(maxNum <= standard) maxNum = standard + 5;
maxNum = Math.ceil((maxNum - standard) / 5);
minNum = Math.ceil((standard - minNum) / 5);
if(maxNum % 2 == 1) maxNum++;
if(minNum % 2 == 1) minNum++;
minData = standard - interval * Math.max(maxNum, minNum) * 5;
maxData = standard + interval * Math.max(maxNum, minNum) * 5;
var chart;

var weekDiv = document.getElementsByClassName('week')[0];
var monthDiv = document.getElementsByClassName('month')[0];
var yearDiv = document.getElementsByClassName('year')[0];


function clickWeek(){
  weekDiv.style.backgroundColor = "white";
  weekDiv.style.color = "#FF6666";
  monthDiv.style.backgroundColor = "#FF6666";
  monthDiv.style.color="white";
  yearDiv.style.backgroundColor = "#FF6666";
  yearDiv.style.color="white";

  interval = 1;
  labelData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  dataGroup = [45, 43, 41, 42, 43.5, 44.1, 43.9];
  var maxNum = Math.max(...dataGroup);
  var minNum = Math.min(...dataGroup);
  if(maxNum <= standard) maxNum = standard + 5;
  maxNum = Math.ceil((maxNum - standard) / 5);
  minNum = Math.ceil((standard - minNum) / 5);
  if(maxNum % 2 == 1) maxNum++;
  if(minNum % 2 == 1) minNum++;
  minData = standard - interval * Math.max(maxNum, minNum) * 5;
  maxData = standard + interval * Math.max(maxNum, minNum) * 5;
  // console.log(maxData);
  // console.log(minData);
  chart.destroy();
  makeChart();
}

function clickMonth(){
  monthDiv.style.backgroundColor = "white";
  monthDiv.style.color = "#FF6666";
  weekDiv.style.backgroundColor = "#FF6666";
  weekDiv.style.color="white";
  yearDiv.style.backgroundColor = "#FF6666";
  yearDiv.style.color="white";

  interval = 1;
  labelData = ['1월', '2월', '3월', '4월', '5월', '6월', '7월'];
  dataGroup = [49, 42, 37, 41, 46, 42, 37];
  var maxNum = Math.max(...dataGroup);
  var minNum = Math.min(...dataGroup);
  if(maxNum <= standard) maxNum = standard + 5;
  maxNum = Math.ceil((maxNum - standard) / 5);
  minNum = Math.ceil((standard - minNum) / 5);
  if(maxNum % 2 == 1) maxNum++;
  if(minNum % 2 == 1) minNum++;
  minData = standard - interval * Math.max(maxNum, minNum) * 5;
  maxData = standard + interval * Math.max(maxNum, minNum) * 5;
  console.log(maxData);
  console.log(minData);
  chart.destroy();
  makeChart();
}

function clickYear(){
  yearDiv.style.backgroundColor = "white";
  yearDiv.style.color = "#FF6666";
  weekDiv.style.backgroundColor = "#FF6666";
  weekDiv.style.color="white";
  monthDiv.style.backgroundColor = "#FF6666";
  monthDiv.style.color="white";

  interval = 1;
  labelData = ['2023년', '2024년', '2025년'];
  dataGroup = [56, 28, 60];
  var maxNum = Math.max(...dataGroup);
  var minNum = Math.min(...dataGroup);
  console.log(maxNum);
  console.log(minNum);
  if(maxNum <= standard) maxNum = standard + 5;
  maxNum = Math.ceil((maxNum - standard) / 5);
  minNum = Math.ceil((standard - minNum) / 5);
  if(maxNum % 2 == 1) maxNum++;
  if(minNum % 2 == 1) minNum++;
  minData = standard - interval * Math.max(maxNum, minNum) * 5;
  maxData = standard + interval * Math.max(maxNum, minNum) * 5;

  chart.destroy();
  makeChart();
}

window.onload = function () {
  makeChart();
}

function makeChart() {
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [...labelData],
      datasets: [{
        data: [...dataGroup],
        borderColor : '#EB6364',
        backgroundColor: '#EB6364',
        borderWidth: 2
      }]
    },
    options: {

      responsive: false,
      plugins:{
          legend: {
              display: false,
              labels: {
                font: {
                 family : 'Noto Sans KR',
                 size: 10
                }
              }
          },
          tooltip: {
            enabled : false
          }
      },
      scales: {
        y: {
          beginAtZero: false,
          min: minData,
          max: maxData,
          grid:{
            color: function(context){
              // console.log(context.tick.value)
              if(context.tick.value === standard){
                document.getElementsByClassName('standart-weight')[0].innerText = `목표 : ${standard}kg`;
                return "#CD5252";
              }
            }

          }
        },
        x:{
          grid:{
            tickColor: "#FFFFFF"
          }
        }
      }
    }
  });
}

