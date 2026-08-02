import { db, ref, set } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {

const registerBtn = document.getElementById("registerBtn");

if (registerBtn) {
    registerBtn.addEventListener("click", registerUser);
}

});

async function registerUser() {

const name = document.getElementById("name").value.trim();
const mobile = document.getElementById("mobile").value.trim();
const password = document.getElementById("password").value;
const confirm = document.getElementById("confirm").value;
const referral = document.getElementById("referral").value.trim();

if (!name || !mobile || !password || !confirm) {
    alert("Please fill all fields");
    return;
}

if (password !== confirm) {
    alert("Passwords do not match");
    return;
}

try {

await set(ref(db, "users/" + mobile), {
    name,
    mobile,
    password,
    referral,
    wallet: 0,
    bonus: 0,
    status: "active",
    createdAt: Date.now()
});

alert("Account Created Successfully!");

window.location.href = "login.html";

} catch (error) {

console.error(error);

alert("Registration Failed\n\n" + error.message);

}

}