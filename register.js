import { db, ref, get, set } from "./firebase.js";


window.register = async function () {


const name = document.getElementById("name").value.trim();

const mobile = document.getElementById("mobile").value.trim();

const password = document.getElementById("password").value.trim();

const confirmPassword = document.getElementById("confirmPassword").value.trim();


// Get Referral Code From Link

const urlParams = new URLSearchParams(window.location.search);

const sponsorCode = urlParams.get("ref") || "Direct";



if(name==="" || mobile==="" || password==="" || confirmPassword===""){

alert("Please fill all fields.");

return;

}



if(mobile.length!==10 || isNaN(mobile)){

alert("Enter valid 10 digit mobile number.");

return;

}



if(password!==confirmPassword){

alert("Passwords do not match.");

return;

}



try{


const userRef = ref(db,"users/"+mobile);



const snapshot = await get(userRef);



if(snapshot.exists()){

alert("This mobile number is already registered.");

return;

}



const refCode = "SSP" + mobile.slice(-6);



await set(userRef,{


name:name,

mobile:mobile,

password:password,

wallet:0,


// User Own Referral Code

refCode:refCode,


// Who Invited This User

sponsorCode:sponsorCode,


totalRef:0,

refBonus:0,

status:"Active",

createdAt:new Date().toLocaleString()


});



alert("Registration Successful!");



window.location.href="login.html";



}
catch(error){


alert(error.message);


}



}