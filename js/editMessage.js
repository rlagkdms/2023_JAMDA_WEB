let alertDiv = document.getElementsByClassName('alert')[0];
let alertTitle = document.getElementsByClassName('alert-title')[0];

let plusBtn = document.getElementsByClassName('plus-btn')[0];
let getPlus = document.getElementsByClassName('get-plsu')[0];
let checkBtn = document.getElementsByClassName('check-btn')[0];

let messageData = [];
let messageDiv = document.getElementsByClassName('message-div')[0];
window.onload = function() {
    getMessage(true);

}
function edit(flag){
    let edit = document.getElementsByClassName('edit-btn')[0];
    if(edit.innerText == "편집" || flag){
        console.log(messageData);
        edit.innerText = "돌아가기"
        plusBtn.style.visibility = "hidden";
        checkBtn.style.visibility = "visible";
        messageDiv.replaceChildren();
        for(let i in messageData){
            let messagePack = document.createElement('div');
            messagePack.className = "messagePack";
            let messages = document.createElement('input');
            let del = document.createElement('div');
            messages.className = "message-edit";
            messages.value = `${messageData[i]}`;
            del.className = "delete";
            del.innerHTML = `<img src="../image/ei_minus.svg" class="del-img"/>`;
            del.onclick = (event) => deleteMessageFront(event);
            messagePack.appendChild(del);
            messagePack.appendChild(messages);
            messageDiv.appendChild(messagePack);
        }
    document.getElementsByClassName('message-edit')[0].focus();
    }else{
        edit.innerText = "편집";
        plusBtn.style.visibility = "visible";
        checkBtn.style.visibility = "hidden";
        messageDiv.replaceChildren();
        makeMessage(messageData);
    }
}
function deleteMessageFront(event){
    let dels = document.getElementsByClassName('del-img');
    if(dels.length <= 1){
        alertDiv.style.visibility = "visible";
        alertTitle.innerText = '응원메세지는 한 개 이상이어야 합니다.';
        return 0;
    }
    for(let i in dels){
        if(event.target == dels[i]){
            deleteMessage(uuid[i]);
        }
    }
}

function makeMessage(messageData) {
    document.getElementsByClassName('edit-btn')[0].innerText = "편집";
    plusBtn.style.visibility = "visible";
    getPlus.style.visibility = "hidden";
    checkBtn.style.visibility = "hidden";
    messageDiv.innerHTML = "";
    for(let data of messageData){
        let create = document.createElement('div');
        create.className = "message";
        create.innerText = data;
        messageDiv.appendChild(create);
    }
}
function plus(){ //응원메세지 추가
    let messages = document.getElementsByClassName('message').length;
    // console.log()
    if(messages >= 3){
        alertDiv.style.visibility = "visible";
        alertTitle.innerText = '응원메세지는 최대 3개 까지 설정 가능합니다';
    }else{
        let createMessage = document.createElement('input');
        createMessage.classList.add('message');
        createMessage.classList.add('message-input');
        messageDiv.appendChild(createMessage);
        plusBtn.style.visibility = "hidden";
        getPlus.style.visibility = "visible";
        createMessage.focus();
    }
}
function backHome(){ //추가하기
    let messageData = [];
    messageData.push(document.getElementsByClassName("message-input")[0].value);
    addMessage(messageData);
    getPlus.style.visibility = "hidden";
    plusBtn.style.visibility = "visible";
}

function checkbtn(){ //확인
    let editData = [];
    for(let i = 0; i<document.getElementsByClassName('message-edit').length; i++){
        editData.push(document.getElementsByClassName('message-edit')[i].value);
    }
    changeMessage(uuid, editData);
    checkBtn.style.visibility = "hidden";
    plusBtn.style.visibility = "visible";

}
// 메시지 넣기
function addMessage(messageData){
    console.log(messageData);
    const userid = localStorage.getItem("userid");
    const updates = [
        { userid: userid, message: messageData }
    ]
    axios.post('http://52.78.221.233:3000/users/message', {
        updates
    })
    .then((response) => {
        getMessage(true);
    })
    .catch((error) => {
        console.error('메시지를 추가하는 중 오류:', error);
    });
}

// 메시지 불러오기
function getMessage(flag){
    const userid = localStorage.getItem("userid");
    axios.post('http://52.78.221.233:3000/users/getMessage', {
          userid : userid,
      })
      .then((response) => {
        messageData = response.data.message;
        console.log(messageData);
        uuid = response.data.uuid;
        if(flag){
            makeMessage(messageData);
        }else{
            edit(true);
        }
        

      })
      .catch((error) => {
        console.error('날짜를 불러오는 중 오류:', error);
      });
}

// 메시지 삭제
function deleteMessage(userid){
    axios.post('http://52.78.221.233:3000/users/deleteMessage', {
          uuid : userid,    // 여기에 삭제 할 uuid 넣이 
      })
      .then((response) => {
        console.log(response.data.message);
        getMessage(false);
        
      })
      .catch((error) => {
        console.error('날짜를 불러오는 중 오류:', error);
      });
}

// 메시지 수정
function changeMessage(uuid, messageData){
    const updates = [
        { uuid : uuid , message: messageData }  // 여기에 uuid배열하고 수정할 메시지 배열 넣기
    ]
    axios.post('http://52.78.221.233:3000/users/changeMessage', {
          updates
      })
      .then((response) => {
        getMessage(true);
      })
      .catch((error) => {
        console.error('날짜를 불러오는 중 오류:', error);
      });
}

function alertCheck(){
    alertDiv.style.visibility = "hidden"; //원래 창으로 돌아갈 때 이 코드
}