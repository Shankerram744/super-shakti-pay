import { db, ref, get } from "./firebase.js";


document.addEventListener("DOMContentLoaded", loadProfile);



async function loadProfile(){


const mobile = localStorage.getItem("userMobile");


if(!mobile){

window.location.href="login.html";

return;

}



try{


const userRef = ref(db,"users/"+mobile);


const snapshot = await get(userRef);



if(snapshot.exists()){


const user = snapshot.val();



document.getElementById("userName").innerText =
user.name || "User";



document.getElementById("userMobile").innerText =
user.mobile || mobile;



document.getElementById("refCode").innerText =
user.refCode || "Not Available";



document.getElementById("wallet").innerText =
user.wallet || 0;



document.getElementById("status").innerText =
user.status || "Active";



}else{


alert("User data not found");


}



}

catch(error){


alert(error.message);


}



}