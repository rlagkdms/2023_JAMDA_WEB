
var customCheckbox = document.getElementsByClassName('chbox');
var checkBox = document.getElementsByTagName('input');

let alertDiv = document.getElementsByClassName('alert')[0];
let alertTitle = document.getElementsByClassName('alert-title')[0];


function alertCheck(){
  alertDiv.style.visibility = "hidden"; //원래 창으로 돌아갈 때 이 코드
}


function sitBtn(e){
    if(e.target.classList.contains('clickbox')){
        e.target.classList.remove('clickbox');
        e.target.classList.add('noclick');
        e.target.previousElementSibling.checked=false;
    }
    else{
        e.target.classList.remove('noclick');
        e.target.classList.add('clickbox');
        e.target.previousElementSibling.checked=true;


    }
}
// 서버로 POST 요청 보내기
function submit() {
    // 로컬 스토리지에서 토큰 가져오기
    const token = localStorage.getItem("token");
  
    // 서버로의 POST 요청 보내기
    axios
      .post("http://52.78.221.233:3000/users/leave", {
      }, {headers: { authorization: token }},)
      .then((response) => {
        // 성공적으로 탈퇴될 경우 서버에서 반환한 메시지를 처리
        console.log(response.data.message); 
        alertDiv.style.visibility = "visible";
        alertTitle.innerText = response.data.message;// 메시지를 알림창으로 표시

        window.location.href = "/html/login.html";
      })
      .catch((error) => {
        // 탈퇴에 실패하거나 오류가 발생한 경우 오류 메시지를 처리
        console.error("탈퇴 오류:", error);
        alertDiv.style.visibility = "visible";
        alertTitle.innerText = "탈퇴 중 오류가 발생했습니다.";
      });
  }
  
