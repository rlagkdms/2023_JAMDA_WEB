let alertDiv = document.getElementsByClassName('alert')[0];
let alertTitle = document.getElementsByClassName('alert-title')[0];

function alertCheck(){
    if(alertTitle.innerText == "회원가입 되었습니다."){
      window.location.href = "../html/login.html";
    }else{
      alertDiv.style.visibility = "hidden";
    }
}

function checkDuplicate() {
    var id = document.getElementById("signup_id").value;
  
    // 아이디 중복 확인 API 엔드포인트 수정
        axios
        .post("http://52.78.221.233:3000/users/check-duplicate", {
            userid: id,
        })
        .then((response) => {
        if (response.data.isDuplicate) {
          alertDiv.style.visibility = "visible";
          alertTitle.innerText = "이미 사용 중인 아이디입니다.";
        } else if (id.length < 8 || id.length > 15) {
          alertDiv.style.visibility = "visible";
          alertTitle.innerText = "아이디는 8자 이상 15자 이하로 입력해주세요.";
          return;
        }
        else {
          alertDiv.style.visibility = "visible";
          alertTitle.innerText = "사용 가능한 아이디입니다.";
        }
      })
      .catch((e) => {
        console.error("Error during duplicate check:", e);
        alertDiv.style.visibility = "visible";
        alertTitle.innerText = "에러가 발생했습니다.";
    });
  }
  
  // 유효성 검사 함수
  function validateId(id) {
    const idRegex = /^[a-z0-9]+$/;
    return idRegex.test(id);
  }
  
  function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{6,20}$/i;
    return passwordRegex.test(password);
  }
  
  function submit() {
    var id = document.getElementById("signup_id").value;
    var pw_1 = document.getElementById("pw_1").value;
    var pw_2 = document.getElementById("pw_2").value;
    var email = document.getElementById("email").value;
  
    if (id.length < 8 || id.length > 15) {
      alertDiv.style.visibility = "visible";
      alertTitle.innerText = "아이디는 8자 이상 15자 이하로 입력해주세요.";
      return;
    }
  
    if (!validateId(id)) {
      alertDiv.style.visibility = "visible";
      alertTitle.innerText = "아이디는 영문 소문자와 숫자로만 이루어져야 합니다.";
      return;
    }
  
    if (!validatePassword(pw_1)) {
      alertDiv.style.visibility = "visible";
      alertTitle.innerText = "비밀번호는 영문 소문자, 숫자, 특수문자를 사용하여 6~20자로 이루어져야 합니다.";
      return;
    }
  
    if (pw_1 !== pw_2) {
      alertDiv.style.visibility = "visible";
      alertTitle.innerText = "비밀번호가 일치하지 않습니다.";
      return;
    }
  
    if (!isEmailVerified) {
      alertDiv.style.visibility = "visible";
      alertTitle.innerText = "이메일 인증을 완료해주세요."
      return;
    }
  
    console.log("Sending registration request with ID:", id);
    axios
    .post("http://52.78.221.233:3000/users/signup", { // URL 수정
        userid: id,
        pw: pw_1,
        email: email,
      })
      .then((response) => {
        console.log("Registration response:", response.data);
        if (response.data.message === "User registered successfully") {
          console.log("Registration successful!");
          alertDiv.style.visibility = "visible";
          alertTitle.innerText = "회원가입 되었습니다."
          // window.location.href = "../html/login.html";
        } else {
          alertDiv.style.visibility = "visible";
          alertTitle.innerText = "인증코드가 일치하지 않습니다. 다시 확인해주세요."
        }
      })
      .catch((e) => {
        console.error("Error during registration:", e);
        alertDiv.style.visibility = "visible";
        alertTitle.innerText = "에러가 발생했습니다."
      });
  }
  
  // 인증번호 보내는 함수
  function emailsubmit() {
    var email = document.getElementById("email").value;
    var authCode = document.getElementById("auth").value;
  
    // 아이디 중복 확인 API 엔드포인트 수정
    axios
    .post("http://52.78.221.233:3000/users/certificate", {
      email: email,
      authCode : authCode
    })
    .then((response) => {
      alertDiv.style.visibility = "visible";
      alertTitle.innerText = "이메일을 발송했습니다."
    })
    .catch((e) => {
    console.error("Error during duplicate check:", e);
    alertDiv.style.visibility = "visible";
    alertTitle.innerText = "에러가 발생했습니다."
    });
  }
  
  
  let isEmailVerified = false; // 이메일 인증 상태를 나타내는 변수
  
  // 인증번호 확인 함수
  function checkAuthCode() {
    var email = document.getElementById("email").value;
    var authCode = document.getElementById("auth").value; // 입력한 인증번호 가져오기
  
    if (authCode.trim() === "") {
      alertDiv.style.visibility = "visible";
      alertTitle.innerText = "인증번호를 입력해주세요."
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
          alertTitle.innerText = "인증번호가 확인되었습니다."
        } else {
          isEmailVerified = false; // 이메일 인증 실패
          alertDiv.style.visibility = "visible";
          alertTitle.innerText = "인증번호가 일치하지 않습니다. 다시 확인해주세요."
        }
      })
      .catch((e) => {
        console.error("Error during auth code check:", e);
        alertDiv.style.visibility = "visible";
        alertTitle.innerText = "에러가 발생했습니다."
      });
  }