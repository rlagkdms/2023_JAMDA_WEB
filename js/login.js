let alertDiv = document.getElementsByClassName('alert')[0];
let alertTitle = document.getElementsByClassName('alert-title')[0];

let hiddenbtn = document.getElementsByClassName("eye")[0];
let pwDiv = document.getElementById("pw");

let hasProfile = 0;

function hiddenPw(){

  if(pwDiv.type === "password"){
      pwDiv.type = "text";
      hiddenbtn.src = "../image/eye-close.svg";
  }
  else{
      pwDiv.type = "password";
      hiddenbtn.src = "../image/iconoir_eye-alt.svg";
  }
}

function alertCheck(){
  if(alertTitle.innerText == "아이디 또는 비밀번호가 일치하지 않습니다." ||
  alertTitle.innerText =="로그인 에러가 발생했습니다."){
    alertDiv.style.visibility = "hidden";
    return 0;
  }
  alertDiv.style.visibility = "hidden"; //원래 창으로 돌아갈 때 이 코드
  if (hasProfile === 0) {
    window.location.href = "../html/termsOfService.html"; // 프로필 설정이 필요한 경우
  } else {
    window.location.href = "../html/main.html"; // 이미 프로필 설정이 된 경우
  }
} 


//alert 코드 대신

function submitLogin() {
  var id = document.getElementById("id").value;
  var pw = document.getElementById("pw").value;

    // 클라이언트 로그인 후
  axios
  .post("http://52.78.221.233:3000/users/login", {
    userid: id,
    pw: pw,
  })
  .then((response) => {
    const token = response.data.token;
    hasProfile = response.data.hasProfile; // 서버에서 받은 hasProfile 값

    localStorage.setItem("token", token);
    localStorage.setItem("userid", id);

    console.log(hasProfile);


    alertDiv.style.visibility = "visible";
    alertTitle.innerText = '로그인 되었습니다';

    

  })
  .catch((error) => {
    if (error.response && error.response.status === 401) {      
      alertDiv.style.visibility = "visible";
      alertTitle.innerText = '아이디 또는 비밀번호가 일치하지 않습니다.';

    } else {
      alertDiv.style.visibility = "hidden";
      alertTitle.innerText = '로그인 에러가 발생했습니다.';

      console.error("Error during logi?n:", error.message);
    }
  });


}
