import { db, ref, get, push } from "./firebase.js";

document.getElementById("depositBtn").addEventListener("click", deposit);

async function deposit(){

const amount=document.getElementById("amount").value;
const utr=document.getElementById("utr").value;

const mobile=localStorage.getItem("userMobile");

if(amount=="" || utr==""){
alert("Fill All Fields");
return;
}

const snap=await get(ref(db,"users/"+mobile));

const user=snap.val();

await push(ref(db,"depositRequests"),{

mobile:mobile,
name:user.name,
amount:Number(amount),
utr:utr,
status:"Pending",
date:new Date().toLocaleString()

});

alert("Deposit Request Submitted");

window.location.href="dashboard.html";

}