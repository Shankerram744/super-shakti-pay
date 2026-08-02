import { db, ref, get } from "./firebase.js";

document.addEventListener("DOMContentLoaded", loadDashboard);

async function loadDashboard() {

    const mobile = localStorage.getItem("userMobile");

    if (!mobile) {
        window.location.href = "login.html";
        return;
    }

    try {

        const snapshot = await get(ref(db, "users/" + mobile));

        if (!snapshot.exists()) {
            alert("User not found");
            localStorage.clear();
            window.location.href = "login.html";
            return;
        }

        const user = snapshot.val();

        // Welcome Name
        document.getElementById("welcome").innerHTML =
        "👋 Welcome, " + (user.name || "User");

        // Wallet Balance
        document.getElementById("wallet").innerText =
        Number(user.wallet || 0).toLocaleString("en-IN");

    } catch (error) {

        console.log(error);
        alert("Dashboard Load Failed");

    }

}

window.logout = function () {

    if (confirm("Do you want to Logout?")) {

        localStorage.removeItem("userMobile");
        localStorage.removeItem("userName");

        window.location.href = "login.html";

    }

};