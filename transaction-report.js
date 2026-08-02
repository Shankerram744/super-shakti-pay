import { db, ref, onValue } from "./firebase.js";


const mobile = localStorage.getItem("userMobile");


if(!mobile){

window.location.href="login.html";

}



const historyRef = ref(db,"history/"+mobile);



onValue(historyRef,(snapshot)=>{


let totalDeposit = 0;
let totalWithdraw = 0;

let html = "";



if(snapshot.exists()){


snapshot.forEach((child)=>{


const item = child.val();



if(item.type === "Wallet Credit"){

totalDeposit += Number(item.amount || 0);

}


if(item.type === "Withdraw"){

totalWithdraw += Number(item.amount || 0);

}



html += `

<div class="transaction">

<h3>
${item.type}
</h3>

<p>
${item.date}
</p>


<div class="amount">

₹ ${item.amount}

</div>


<div class="status">

${item.status}

</div>


</div>

`;



});


}else{


html = "<p>No Transactions Found</p>";



}



document.getElementById("totalDeposit").innerText =
"₹"+totalDeposit;



document.getElementById("totalWithdraw").innerText =
"₹"+totalWithdraw;



document.getElementById("reportList").innerHTML = html;



});