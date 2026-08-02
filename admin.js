import { 
db, 
ref, 
onValue, 
update, 
get, 
set, 
push 
} from "./firebase.js";


// LOAD USERS

const usersRef = ref(db,"users");

onValue(usersRef,(snapshot)=>{

let totalUsers = 0;
let totalBalance = 0;
let html = "";

snapshot.forEach((child)=>{

const user = child.val();

totalUsers++;

totalBalance += Number(user.wallet || 0);


html += `

<div class="user">

<div>

<div class="name">
${user.name}
</div>

<div class="mobile">
${user.mobile}
</div>

</div>


<div class="wallet">
₹${user.wallet || 0}
</div>

</div>

`;

});


document.getElementById("totalUsers").innerText = totalUsers;

document.getElementById("totalBalance").innerText =
"₹" + totalBalance;


document.getElementById("userList").innerHTML =
html || "<p>No Users Found</p>";


});
// LOAD ADD MONEY REQUESTS

const requestRef = ref(db,"addMoneyRequests");


onValue(requestRef,(snapshot)=>{


let html = "";


if(snapshot.exists()){


snapshot.forEach((child)=>{


const request = child.val();


html += `

<div class="user">

<div>

<div class="name">
📱 ${request.mobile}
</div>

<div class="mobile">
Amount: ₹${request.amount}
</div>

<div class="mobile">
Status: ${request.status}
</div>

</div>


<div>

<button 
onclick="approveRequest('${child.key}','${request.mobile}',${request.amount})">
✅ Approve
</button>


<button 
onclick="rejectRequest('${child.key}')">
❌ Reject
</button>


</div>


</div>

`;


});


}
else{


html = "<p>No Requests Found</p>";


}


document.getElementById("requestList").innerHTML = html;


});
// APPROVE ADD MONEY REQUEST

window.approveRequest = async function(requestId, mobile, amount){


try{


// User wallet update

const userRef = ref(db,"users/"+mobile);

const userSnap = await get(userRef);


if(userSnap.exists()){


const user = userSnap.val();


const newWallet =
Number(user.wallet || 0) + Number(amount);



await update(userRef,{

wallet:newWallet

});

}


// Request status update

const requestUpdate = ref(
db,
"addMoneyRequests/"+requestId
);


await update(requestUpdate,{

status:"Approved"

});


alert("Money Added Successfully");


}

catch(error){


alert(error.message);


}


};



// REJECT REQUEST

window.rejectRequest = async function(requestId){


try{


const requestUpdate = ref(
db,
"addMoneyRequests/"+requestId
);



await update(requestUpdate,{

status:"Rejected"

});


alert("Request Rejected");


}

catch(error){


alert(error.message);


}


};
// SEARCH USER

window.searchUser = function(){

const filter =
document.getElementById("searchUser")
.value
.toLowerCase();


const users =
document.querySelectorAll(".user");


users.forEach((user)=>{


const text =
user.innerText.toLowerCase();


if(text.includes(filter)){

user.style.display="flex";

}else{

user.style.display="none";

}


});


};



// CREDIT WALLET MANUALLY

window.creditWallet = async function(){


const mobile =
document.getElementById("userMobile").value;


const amount =
Number(document.getElementById("walletAmount").value);



if(mobile==="" || amount<=0){

alert("Enter Mobile and Amount");

return;

}



const userRef =
ref(db,"users/"+mobile);



const snap =
await get(userRef);



if(snap.exists()){


const user=snap.val();


await update(userRef,{

wallet:
Number(user.wallet || 0)+amount

});


alert("Wallet Credited");


}else{


alert("User Not Found");


}


};




// DEBIT WALLET

window.debitWallet = async function(){


const mobile =
document.getElementById("userMobile").value;


const amount =
Number(document.getElementById("walletAmount").value);



const userRef =
ref(db,"users/"+mobile);



const snap =
await get(userRef);



if(snap.exists()){


const user=snap.val();


await update(userRef,{

wallet:
Number(user.wallet || 0)-amount

});
const historyRef = push(ref(db,"history/"+mobile));

await set(historyRef,{

type:"Wallet Credit",

amount:Number(amount),

status:"Success",

date:new Date().toLocaleString()

});

alert("Wallet Debited");


}else{


alert("User Not Found");


}


};
// LOAD WITHDRAW REQUESTS

const withdrawRef = ref(db,"withdrawRequests");


onValue(withdrawRef,(snapshot)=>{


let html = "";


if(snapshot.exists()){


snapshot.forEach((child)=>{


const request = child.val();


html += `

<div class="user">

<div>

<div class="name">
📱 ${request.mobile}
</div>

<div class="mobile">
Withdraw Amount: ₹${request.amount}
</div>

<div class="mobile">
Status: ${request.status}
</div>

</div>


<div>

<button onclick="approveWithdraw('${child.key}','${request.mobile}',${request.amount})">

✅ Approve

</button>


<button onclick="rejectWithdraw('${child.key}')">

❌ Reject

</button>


</div>

</div>

`;

});


}else{


html="<p>No Withdraw Requests Found</p>";

}


document.getElementById("withdrawList").innerHTML=html;


});



// APPROVE WITHDRAW

window.approveWithdraw = async function(id,mobile,amount){


const userRef = ref(db,"users/"+mobile);


const snap = await get(userRef);


if(snap.exists()){


const user = snap.val();


let balance = Number(user.wallet || 0);


if(balance < Number(amount)){


alert("Insufficient Wallet Balance");

return;

}



await update(userRef,{

wallet: balance - Number(amount)

});


// Update Request Status

await update(
ref(db,"withdrawRequests/"+id),
{
status:"Approved"
}
);


// Save History

const historyRef = push(ref(db,"history/"+mobile));


await set(historyRef,{

type:"Withdraw",

amount:Number(amount),

status:"Success",

date:new Date().toLocaleString()

});


alert("Withdraw Approved");


}

};



// REJECT WITHDRAW

window.rejectWithdraw = async function(id){


await update(

ref(db,"withdrawRequests/"+id),

{
status:"Rejected"
}

);


alert("Withdraw Rejected");


};