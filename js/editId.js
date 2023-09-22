let = userName = "잼다";
document.getElementsByClassName('s_id')[0].value = `${userName}`;

// 유효성 검사 함수
function validateId(id) {
    const idRegex = /^[a-z0-9]+$/;
    return idRegex.test(id);
}
const token = localStorage.getItem("token");

function change(){
    var id = document.getElementById("id").value;

    if (!validateId(id)) {
        alert("아이디는 영문 소문자와 숫자로만 이루어져야 합니다.");
        return;
    }

    axios
    .post("http://52.78.221.233:3000/users/change-user-id", {
        userid : id
    }, {headers: { authorization: token }})
    .then((response) => {
        alert(response.data.message); // 변경 결과에 따라 메시지를 표시
        window.location.href='./editIdPw.html';
    })
    .catch((e) => {
        console.error("Error during user ID change:", e);
        alert("에러가 발생했습니다.");
    });
}

function checkDuplicate() {
    var id = document.getElementById("id").value;
  
    // 아이디 중복 확인 API 엔드포인트 수정
        axios
        .post("http://52.78.221.233:3000/users/check-duplicate", {
            userid: id,
        })
        .then((response) => {
            if (response.data.isDuplicate) {
                alert("이미 사용 중인 아이디입니다.");
            } else if (id.length < 8 || id.length > 15) {
                alert("아이디는 8자 이상 15자 이하로 입력해주세요.");
                return;
            }
            else {
                alert("사용 가능한 아이디입니다.");
            }
        })
        .catch((e) => {
            console.error("Error during duplicate check:", e);
            alert("에러가 발생했습니다.");
    });
}