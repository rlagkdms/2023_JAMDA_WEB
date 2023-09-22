let alertDiv = document.getElementsByClassName('alert')[0];
let alertTitle = document.getElementsByClassName('alert-title')[0];

function alertCheck(){
  alertDiv.style.visibility = "hidden";
}

let today = new Date().getDate();
console.log(today);
function fetchAndDisplayUserName() {
  // localStorage에서 token 값을 가져와서 출력
  const token = localStorage.getItem('token');
  
  axios
    .get('http://52.78.221.233:3000/users/getUserInfo', {
      headers: {
        authorization: token,
      },
    })
    .then((response) => {
      const userName = response.data.name;
      const userBias = response.data.bias;
      const userWeight = response.data.weight;
      const userGoal_weight = response.data.goal_weight;
      const Dday = response.data.registration_date;

      let firstDay = new Date(Dday).getDate();
      console.log(firstDay);


      // 프로필 수정 이전의 무게
      const previousWeight = response.data.previousWeight;

      // 무게 차이 계산
      const minus_kg = userWeight - previousWeight;

      document.getElementById('user-name').innerHTML = `<span>${userName}</span>님`;
      document.getElementById('d-day').innerHTML = `<span style="font-weight: bold">${userBias}</span>와(과) 함께 운동한지 <span>${today-firstDay+1}</span>일`;
      document.getElementById('present').innerHTML = `현재<span>${userWeight}kg</span>`;
      document.getElementById('goal').innerHTML = `목표<span>${userGoal_weight}kg</span>`;
      document.getElementById('minus_kg').innerHTML = `감량한 무게<span>${minus_kg}kg</span>`;
    })
    .catch((error) => {
      alertDiv.style.visibility = "visible";
      alertTitle.innerText = '사용자 정보를 가져오는 중 오류 발생';
    });
}



function logout(){
  document.getElementsByClassName('logout-confirm')[0].style.visibility = "visible";
}

function check(flag){
  let confirmDiv = document.getElementsByClassName('logout-confirm')[0];
  confirmDiv.style.visibility = "hidden";
  const id = localStorage.getItem('userid');
  if(flag){
    axios
    .post('http://52.78.221.233:3000/users/logout', {
      userid: id, 
    })
    .then((response) => {
      if (response.status === 200) {
        window.location.href = './login.html'; 
      } else {
        alertDiv.style.visibility = "visible";
        alertTitle.innerText = '로그아웃 실패';
      }
    })
    .catch((error) => {
      alertDiv.style.visibility = "visible";
      alertTitle.innerText = '로그아웃 중 오류 발생';
    });
      window.location.href = "./login.html";
  }
}

window.addEventListener('load', fetchAndDisplayUserName);