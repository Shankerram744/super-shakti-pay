import { db, ref, get } from "./firebase.js";

async function loadDashboard(){

const snap = await get(ref(db,"users"));

let totalUsers=0;
let totalWallet=0;
let totalBonus=0;

snap.forEach(item=>{

const user=item.val();

totalUsers++;

totalWallet+=Number(user.wallet||0);

totalBonus+=Number(user.bonus||0);

});

document.getElementById("users").innerText=totalUsers;
document.getElementById("wallet").innerText=totalWallet;
document.getElementById("bonus").innerText=totalBonus;

}

loadDashboard();