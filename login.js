// Super Shakti Pay Login

window.login = function(){

let mobile = document.getElementById("mobile").value;
let password = document.getElementById("password").value;


if(mobile === "" || password === ""){

alert("Please enter Mobile Number and Password");

return;

}


if(mobile.length !== 10){

alert("Enter valid 10 digit mobile number");

return;

}


// Demo Login Save

localStorage.setItem("userMobile", mobile);
localStorage.setItem("loginStatus", "true");


// Go to Dashboard

window.location.href = "dashboard.html";


}