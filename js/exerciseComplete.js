// let alertDiv = document.getElementsByClassName('alert')[0];
// let alertTitle = document.getElementsByClassName('alert-title')[0];

function alertCheck(){
    alertDiv.style.visibility = "hidden";
} 

function moveToCalendar(){
    window.location.href = "../html/Calendar.html";
}
function addDate(){
    const id = localStorage.getItem('userid');

    axios
    .post("http://52.78.221.233:3000/users/dateCalendar", {
        userid: id,
    })
    .then((response) => {

    })
    .catch((e) => {
        console.log(err);
    }); 
  
}
addDate();
