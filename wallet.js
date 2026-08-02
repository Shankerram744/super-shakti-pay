import { db, ref, onValue } from "./firebase.js";

const mobile = localStorage.getItem("userMobile");

if (mobile) {

const userRef = ref(db, "users/" + mobile);

onValue(userRef, (snapshot) => {

if (snapshot.exists()) {

const data = snapshot.val();

document.getElementById("wallet").innerText = data.wallet || 0;

}

});

}

window.logout = function () {

localStorage.removeItem("userMobile");
localStorage.removeItem("loginStatus");

alert("Logout Successful");

window.location.href = "login.html";

};