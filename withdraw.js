import { db, ref, push, set } from "./firebase.js";


window.withdrawMoney = async function(){


const mobile = localStorage.getItem("userMobile");


const amount = document
.getElementById("amount")
.value
.trim();



if(!mobile){

window.location.href="login.html";

return;

}



if(amount===""){

alert("Please enter amount");

return;

}



if(isNaN(amount) || Number(amount)<=0){

alert("Enter valid amount");

return;

}



try{


const withdrawRef = push(
ref(db,"withdrawRequests")
);



await set(withdrawRef,{

mobile:mobile,

amount:Number(amount),

status:"Pending",

createdAt:new Date().toLocaleString()

});



alert("Withdraw Request Submitted Successfully");


document.getElementById("amount").value="";



}

catch(error){


alert(error.message);


}


};