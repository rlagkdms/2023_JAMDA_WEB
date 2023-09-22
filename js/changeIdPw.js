let hiddenbtn = document.getElementsByClassName("eye");
let pwDiv = document.getElementsByClassName("input-pw");

function hiddenPw(num){
    console.log(pwDiv[num]);
    console.log(hiddenbtn);
    if(pwDiv[num].type === "password"){
        pwDiv[num].type = "text";
        hiddenbtn[num].src = "/image/eye-close.svg";
    }
    else{
        pwDiv[num].type = "password";
        hiddenbtn[num].src = "/image/iconoir_eye-alt.svg";
    }
}
