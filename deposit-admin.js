import { db, ref, get, update } from "./firebase.js";

document.addEventListener("DOMContentLoaded", loadRequests);

async function loadRequests(){

const list=document.getElementById("requestList");

const snap=await get(ref(db,"depositRequests"));

if(!snap.exists()){
list.innerHTML="No Requests";
return;
}

let html="";

snap.forEach(item=>{

const d=item.val();

html+=`
<div class="request">

<h3>${d.name}</h3>

<p>Mobile : ${d.mobile}</p>

<p>Amount : ₹${d.amount}</p>

<p>UTR : ${d.utr}</p>

<p>Status : ${d.status}</p>

<button onclick="approve('${item.key}','${d.mobile}',${d.amount})">
Approve
</button>

</div>
`;

});

list.innerHTML=html;

}

window.approve=async function(id,mobile,amount){

const userSnap=await get(ref(db,"users/"+mobile));

const user=userSnap.val();

await update(ref(db,"users/"+mobile),{
wallet:Number(user.wallet||0)+Number(amount)
});

await update(ref(db,"depositRequests/"+id),{
status:"Approved"
});

alert("Deposit Approved");

location.reload();

}