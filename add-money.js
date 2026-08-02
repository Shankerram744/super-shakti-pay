import { db, ref, push, set } from "./firebase.js";

window.addMoney = async function () {

const mobile = localStorage.getItem("userMobile");

const amount = document.getElementById("amount").value.trim();

if (amount === "") {
alert("Please enter amount.");
return;
}

if (isNaN(amount) || Number(amount) <= 0) {
alert("Enter valid amount.");
return;
}

try {

const requestRef = push(ref(db, "addMoneyRequests"));
await set(requestRef, {
mobile: mobile,
amount: Number(amount),
status: "Pending",
createdAt: new Date().toLocaleString()
});

alert("Add Money Request Submitted Successfully!");

document.getElementById("amount").value = "";

} catch (error) {

alert(error.message);

}

};