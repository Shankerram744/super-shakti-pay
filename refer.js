import { db, ref, get } from "./firebase.js";


document.addEventListener("DOMContentLoaded", loadRefer);



async function loadRefer(){


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



document.getElementById("refCode").innerText =
user.refCode || "Not Available";



}


}

catch(error){


alert(error.message);


}


}




window.shareRefer = function(){


const code = document.getElementById("refCode").innerText;


const link =
window.location.origin +
"/register.html?ref=" +
code;



if(navigator.share){


navigator.share({

title:"Super Shakti Pay",

text:"Join Super Shakti Pay using my referral link",

url:link


});


}else{


navigator.clipboard.writeText(link);


alert("Referral Link Copied");


}



};