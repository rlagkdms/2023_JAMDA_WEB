
let alertDiv = document.getElementsByClassName('alert')[0];
let alertTitle = document.getElementsByClassName('alert-title')[0];

let btn1 = document.getElementsByClassName("in")[0];
let btn2 = document.getElementsByClassName("in")[1];

let input1 = document.getElementsByClassName('tel-number')[0];
let input2 = document.getElementsByClassName('tel-number')[1];

var check = /[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

btn1.addEventListener("input", () => {
    if((check.test(btn1.value) == true)) {
        input1.style.background = "rgba(255, 102, 102, 1)";
    }else{
        input1.style.background = "rgba(255, 194, 194, 1)";
    }
})
input1.onclick = () => {
    if(input1.style.background != "rgba(255, 194, 194, 1)"){
        input1.style.background = 'rgba(255, 194, 194, 1)';
    }
    emailsubmit();
}
btn2.addEventListener("input", () => {
    if(btn2.value.length == 4 && !(isNaN(btn2.value))) {
        input2.style.background = "rgba(255, 102, 102, 1)";
    }else{
        input2.style.background = "rgba(255, 194, 194, 1)";
    }
});
input2.onclick = () => {
  checkAuthCode()  
    if(input2.style.background != "rgba(255, 194, 194, 1)"){
        input2.style.background = 'rgba(255, 194, 194, 1)';
    }
}

function btnok(){
    if(!(btn1.value==='')&&!(btn2.value==='')){
        location.href = '../html/findIdPw.html';
        findId();
    }

}

function emailsubmit() {
    console.log('함수 확인');
    var email = document.getElementById("email").value;
    var authCode = document.getElementById("auth").value;
  axios
    // 아이디 중복 확인 API 엔드포인52.78.221.233os
    .post("http://52.78.221.233:3000/users/certificate", {
      email: email,
      authCode : authCode
    })
    .then((response) => {
      alertDiv.style.visibility = "visible";
      alertTitle.innerText = '이메일을 발송했습니다.';

    })
    .catch((e) => {
    console.error("Error during duplicate check:", e);
    alertDiv.style.visibility = "visible";
    alertTitle.innerText = '에러가 발생했습니다.';
    });
  }  

     
  let isEmailVerified = false; // 이메일 인증 상태를 나타내는 변수
    
  // 인증번호 확인 함수
  function checkAuthCode() {
    var email = document.getElementById("email").value;
    var authCode = document.getElementById("auth").value; // 입력한 인증번호 가져오기
  
    if (authCode.trim() === "") {
      alertDiv.style.visibility = "visible";
      alertTitle.innerText = '인증번호를 입력해주세요';
      return;
    }
    axios
      .post("http://52.78.221.233:3000/users/check-auth-code", {
        email: email,
        code: authCode,
      })
      .then((response) => {
        if (response.status === 200 && response.data.message === '인증번호가 확인되었습니다.') {
          isEmailVerified = true; // 이메일 인증 성공
          alertDiv.style.visibility = "visible";
          alertTitle.innerText = '인증번호가 확인되었습니다';
        } else {
          isEmailVerified = false; // 이메일 인증 실패
          
          alertDiv.style.visibility = "visible";
          alertTitle.innerText = '인증번호가 일치하지 않습니다. 다시 확인해주세요.';
        }
      })
      .catch((e) => {
        console.error("Error during auth code check:", e);
        alertDiv.style.visibility = "visible";
        alertTitle.innerText = '에러가 발생했습니다.';
      });
  }  
          
// 아이디 찾는 함수
function findId() {
  var email = document.getElementById("email").value;

  axios
    .post("http://52.78.221.233:3000/users/findUserId", {
      email: email,
    })
    .then((response) => {
      const userid = response.data.userId;
      localStorage.setItem("userid", userid);
      return userid;
    })
    .catch((e) => {
      console.error("Error during auth code check:", e);
      alertDiv.style.visibility = "visible";
      alertTitle.innerText = '에러가 발생했습니다.';
    });
}

function alertCheck() {
  alertDiv.style.visibility = "hidden"; //원래 창으로 돌아갈 때 이 코드
}

  
  