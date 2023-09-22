let alertDiv = document.getElementsByClassName('alert')[0];
let alertTitle = document.getElementsByClassName('alert-title')[0];

let menu = [...document.getElementsByClassName("sub-menu")];
let menulist = document.getElementsByClassName("slide")[0];
let findid = document.getElementsByClassName("findid")[0];
let findpw = document.getElementsByClassName("findpw")[0];

let resultTxt = document.querySelector('.showid');


let nowId = document.getElementById('nowid').value;
let newPw = document.getElementById('newpw').value;
let checkPw = document.getElementById('newpw_check').value;

id = '1234';
// 아이디 가져오기

const userid = localStorage.getItem('userid');

id = userid;
resultTxt.innerText = `회원님의 아이디는 ${id} 입니다`;
// 아이디 표시
resultTxt.innerText = `회원님의 아이디는 ${userid} 입니다`;

// 메뉴 클릭 이벤트 리스너
for (var i in menu) {
  menu[i].addEventListener("click", (e) => {
    if (e.target.innerText == "아이디") {
      menulist.style.animationName = 'rollback-ani';
      findid.style.display = "flex";
      findpw.style.display = "none";
    } else {
      menulist.style.animationName = 'box-ani';
      findid.style.display = "none";
      findpw.style.display = "flex";
    }
  });
}

let nowId = document.getElementById('nowid').value;
let newPw = document.getElementById('newpw'); // newPw 변수 정의와 초기화
let checkPw = document.getElementById('newpw_check');



// 비밀번호 유효성 검사 함수
function validatePassword() {
  const pwCheck = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,20})/i;
  return pwCheck.test(newPw.value);
}

// 비밀번호 변경 함수
function pwChange() {
  if (userid === '') {
    alertDiv.style.visibility = "visible";
    alertTitle.innerText = "아이디를 입력해 주세요";
    return;
  }

  if (!validatePassword()) {
    alertDiv.style.visibility = "visible";
    alertTitle.innerText = "비밀번호는 영문 소문자, 숫자, 특수문자를 사용하여 6~20자로 이루어져야 합니다.";
    return;
  }
  if (newPw.value != checkPw.value) {
    alertDiv.style.visibility = "visible";
    alertTitle.innerText = "비밀번호가 일치하지 않습니다.";
    return;
  }

  axios
    .post("http://52.78.221.233:3000/users/loginChangePassword", {
      userid: userid,
      newPassword: checkPw.value
    })
    .then((response) => {
      console.log(checkPw);
      // documentgetElementbyid(newpw_check)
      alertDiv.style.visibility = "visible";
      alertTitle.innerText = "비밀번호가 변경되었습니다.";
    })
    .catch((e) => {
      console.error("Error during password change:", e);
      alertDiv.style.visibility = "visible";
      alertTitle.innerText = '에러가 발생했습니다.';
    });
}
function alertCheck(){
  alertDiv.style.visibility = "hidden"; 
//   location.href = '../html/login.html';
}

// 아이디 찾는 함수
function findId() {
  var email = document.getElementById("email").value;

  axios
    .post("http://52.78.221.233:3000/users/findUserId", {
      email: email,
    })
    .then((response) => {
      const foundUserId = response.data.userId;
      console.log(foundUserId);
    })
    .catch((e) => {
      console.error("Error during finding user ID:", e);
      alertDiv.style.visibility = "visible";
      alertTitle.innerText = '에러가 발생했습니다.';
    });
}


function alertCheck() {
  if(alertTitle.innerText == "비밀번호가 변경되었습니다."){
    window.location.href = "../html/login.html"
  }
  alertDiv.style.visibility = "hidden";
}
