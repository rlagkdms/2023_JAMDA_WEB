let scrollDiv = document.getElementById("tit");     
const plusBtn = document.getElementById('btn_plus'); // +버튼
let result = document.getElementById('resultbox');// 추가된 규칙 
let editBtn = document.getElementById('edit_btn'); //편집  
let title = document.getElementById('tit') // 창 제목 
let alert = document.getElementById('delete_check');

let alertDiv = document.getElementsByClassName('alert')[0];
let alertTitle = document.getElementsByClassName('alert-title')[0];
function alertCheck(){
    alertDiv.style.visibility = "hidden";
}

let likeDo=[];
let exerciseTitle=[];
let exerciseRule=[];
let exerciseUnit=[];
var uuid;




function fetchRules() {
  // 사용자의 Token을 로컬 스토리지에서 가져옵니다.
  const token = localStorage.getItem("token");
  
  // 서버로 GET 요청을 보냅니다.
  axios.get('http://52.78.221.233:3000/users/getRules', {
      headers: {
          Authorization: token // 토큰을 헤더에 포함
      }
  })
  .then((response) => {
      likeDo = response.data.activity;
      exerciseTitle = response.data.exercise;
      exerciseRule = response.data.activityNum;
      exerciseUnit = response.data.unit;
      baseExerCount = response.data.count;
      uuid = response.data.uuid;

      console.log(likeDo);
      console.log(exerciseTitle);
      console.log(exerciseRule);
      console.log(exerciseUnit);
      console.log(baseExerCount);
      console.log(uuid);
       
      addList();
     
      return uuid;

     
  })
  .catch((error) => {
      console.error('Error fetching data:', error);
  });
}
fetchRules();

function scrollBox() {
    shouldMoveToTop = scrollDiv.parentElement.parentElement.className;
    if(shouldMoveToTop == 'slide_box closed')
        scrollDiv.parentElement.parentElement.setAttribute("class", "slide_box open");
    else
        scrollDiv.parentElement.parentElement.setAttribute("class", "slide_box closed");
    
}

var ruleList= document.getElementsByClassName('list_click');

//규칙 추가하기
plusBtn.addEventListener("click", (e)=> location.href = "/html/addRule.html");
function addList(){
    for(i =0; i<likeDo.length;i++){
        //규칙 추가
        list = document.createElement("div"); //목록의 클래스 추가
        list.className = 'list_div';
        listClick = document.createElement('div');
        listClick.classList.add('list_click');
    
        //규칙 삭제 버튼 추가
        img = new Image();
        img.classList.add('delimg');
        img.src = '../image/ei_minus.svg';

        img.style.position = "absolute";
        img.style.top = "-5px";
        img.style.left = "-6px";
        img.style.display="none";

    //규칙 이름, 내용 보여주기
        let listTit = document.createElement("span");//규칙이름
        let listTex = document.createElement("span");//규칙내용
        listTit.classList.add("order"); listTex.classList.add("exir");
        listTit.innerText =likeDo[i];
        listTex.innerText =`${exerciseTitle[i]}  ${exerciseRule[i]} ${exerciseUnit[i]}`;
        result.appendChild(list);
        list.appendChild(listClick);
        list.appendChild(img);
        listClick.appendChild(listTit);
        listClick.appendChild(listTex);

        listClick.onclick = function(event){
            console.log(ruleList);
            for(i in ruleList){ 
                  if(ruleList[i].parentElement === event.target.parentElement){
                    console.log(uuid[i]);
                    getAllRulesByUuid(uuid[i]);
                    localStorage.setItem('uuid', uuid[i]);
                  }
            }
            if(editBtn.textContent == '완료'){
                location.href = '../html/editRule.html'
            }
        }

        //규칙 삭제하기
        img.onclick =  (event) => {
            let removeElement = event.currentTarget.parentElement;
            let currect;
            for(i in ruleList){ 
                if(ruleList[i].parentElement === event.target.parentElement){
                  console.log(uuid[i]);
                  currect = i;
                //   deleteRule(uuid[i]);
                }
              }
              console.log(currect);
            Alert(uuid[currect]).then((result) => {
                if(result == true)
                {
                    removeElement.remove(removeElement);
                }
            });
        }
    }
}

function getAllRulesByUuid(uuid) {
    axios
    .post("http://52.78.221.233:3000/users/getAllRulesByUuid", {
        uuid: uuid    
    })
    .then((response) => {
        likeDo = response.data.activity;
        exerciseTitle = response.data.exercise;
        exerciseRule = response.data.activityNum;
        exerciseUnit = response.data.unit;
        count_min = response.data.count_min;
        count_max = response.data.count_max;
        baseExerCount = response.data.count;
        uuid = response.data.uuid;

        console.log(likeDo);
        console.log(exerciseTitle);
        console.log(exerciseRule);
        console.log(exerciseUnit);
        console.log(count_min);
        console.log(count_max);
        console.log(baseExerCount);

    })
    .catch((e) => {
        console.log(err);
    });
}  

function deleteRule(uuid) {
    axios
    .post("http://52.78.221.233:3000/users/deleteRule", {
        uuid: uuid    
    })
    .then((response) => {
        console.log("삭제되었습니다.");
    })
    .catch((e) => {
        console.log(err);
    });
} 

//삭제 확인 알림창
function Alert(uuid){
    // confirm('삭제하시겠습니까?');
    let yes =document.getElementById('delete_ok');
    let no = document.getElementById("delete_no");
    alert.style.display ='flex';
    alert.style.boxShadow = "rgba(0,0,0,0.5) 0 0 0 9999px, rgba(0,0,0,0) 0 0 0 0";
    return new Promise((resolve) => {
        yes.addEventListener('click', () => {
            resolve(true);
            alert.style.display='none';
            deleteRule(uuid);
        });
        no.addEventListener('click', () => {
            resolve(false);
            alert.style.display='none';
        });
    });

}


//규칙 편집하기
editBtn.addEventListener("click", (e)=> editList(e));

function editList(){
    let clickDiv = document.getElementsByClassName('list-click');
    if(editBtn.textContent === '편집'){
        title.innerText = "규칙 편집";
        editBtn.innerText = "완료";
        editBtn.style.color = "rgba(204, 82, 82, 1)";
    
        plusBtn.style.display = "flex";

        Alldelete =document.getElementsByClassName("delimg");
        for(let next of Alldelete){
            next.style.display="flex";
        }
        
    }else{
        title.innerText = "내 규칙";
        editBtn.innerText = "편집";
        editBtn.style.color = "black";

        plusBtn.style.display = "none";
        Alldelete =document.getElementsByClassName("delimg");
        for(let next of Alldelete){
            next.style.display="none";
        }
    }
}

function alertCheck(){
    alertDiv.style.visibility = "hidden"; //원래 창으로 돌아갈 때 이 코드
    // window.location.href = "" //다른 창으로 갈거면 이 코드 (""안에 경로 입력)
}


function uploadImage() {
    const input = document.getElementById('camerabtn');
    const selectedImage = input.files[0]; // 선택한 이미지 가져오기
    console.log(selectedImage);
    if (selectedImage) {
        // 이미지를 다음 페이지로 전달
        const url = 'mainPicture.html';
        const formData = new FormData();
        formData.append('image', selectedImage);

        let values = formData.values();
        for (const pair of values) {
          console.log(pair);
        }
        // POST 요청을 사용하여 이미지 데이터를 다음 페이지로 전달
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.send(formData);
        // 페이지 이동
        window.location.href = url;
    }
    else{
        alertDiv.style.visibility = "visible";
        alertTitle.innerText = '이미지를 선택하세요';
    }
}