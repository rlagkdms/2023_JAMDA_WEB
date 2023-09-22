let alertDiv = document.getElementsByClassName('alert')[0];
let alertTitle = document.getElementsByClassName('alert-title')[0];
function alertCheck(){
  if(alertTitle.innerText == "프로필이 설정되었습니다."){
    window.location.href = '../html/main.html';
  }
  alertDiv.style.visibility = "hidden";
} 



function submit() {
  var name = document.getElementById('name').value;
  var bias = document.getElementById('bias').value;
  var weight = document.getElementById('weight').value;
  var goal_weight = document.getElementById('goal_weight').value;

  // 로컬 스토리지에서 유저 아이디 가져오기
  const token = localStorage.getItem('token');

  axios
    .post(
      'http://52.78.221.233:3000/users/setProfile',
      {
        name: name,
        bias: bias,
        weight: weight,
        goal_weight: goal_weight,
      },
      { headers: { authorization: token } }
    )
    .then((response) => {
      alertDiv.style.visibility = "visible";
      alertTitle.innerText = '프로필이 설정되었습니다.';
      
    })
    .catch((error) => {
      alertDiv.style.visibility = "visible";
      alertTitle.innerText = '프로필 설정 중 오류가 발생했습니다.';
    });
}
