
let alertDiv = document.getElementsByClassName('alert')[0];
let alertTitle = document.getElementsByClassName('alert-title')[0];

function alertCheck(){
  alertDiv.style.visibility = "hidden";
} 


function change() {
    const currentPw = document.getElementById("current-pw").value;
    const newPw = document.getElementById("new-pw").value;
    const confirmPw = document.getElementById("confirm-pw").value;

    const token = localStorage.getItem("token");
  
    // 현재 비밀번호, 새 비밀번호, 비밀번호 확인의 유효성을 검사합니다.
    if (!currentPw || !newPw || !confirmPw) {
      alertDiv.style.visibility = "visible";
      alertTitle.innerText = '비밀번호를 입력하세요.';
      return;
    }
  
    if (newPw !== confirmPw) {
      alertDiv.style.visibility = "visible";
      alertTitle.innerText = '새 비밀번호와 비밀번호 확인이 일치하지 않습니다.';
      return;
    }

    function validatePassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{6,20}$/i;
        return passwordRegex.test(password);
    }

    if (!validatePassword(newPw)) {
        alertDiv.style.visibility = "visible";
        alertTitle.innerText = "비밀번호는 영문 소문자, 숫자, 특수문자를 사용하여 6~20자로 이루어져야 합니다.";
        return;
    }
  
    axios
    .post("http://52.78.221.233:3000/users/change-password", {
        currentPassword: currentPw,
        newPassword: newPw,
      }, {headers: { authorization: token }})
      .then((response) => {
        alertDiv.style.visibility = "visible";
        alertTitle.innerText = response.data.message;
        window.location.href='./editIdPw.html';
      })
      .catch((error) => {
        console.error("비밀번호 변경 중 오류 발생:", error);
        alertDiv.style.visibility = "visible";
        alertTitle.innerText = "비밀번호 변경 중 오류가 발생했습니다.";
      });
  }
  