import { db, ref, get } from "./firebase.js";

document.addEventListener("DOMContentLoaded", loadSettings);

async function loadSettings() {

    const mobile = localStorage.getItem("userMobile");

    if (!mobile) {
        window.location.href = "login.html";
        return;
    }

    try {

        const snapshot = await get(ref(db, "users/" + mobile));

        if (!snapshot.exists()) {
            alert("User Not Found");
            localStorage.clear();
            window.location.href = "login.html";
            return;
        }

        console.log("Settings Loaded");

    } catch (error) {

        console.log(error);
        alert("Unable to load settings.");

    }

}

window.logout = function () {

    if (confirm("Are you sure you want to logout?")) {

        localStorage.removeItem("userMobile");
        localStorage.removeItem("userName");

        window.location.href = "login.html";

    }

};