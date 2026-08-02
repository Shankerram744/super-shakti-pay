import { db, ref, get } from "./firebase.js";

document.addEventListener("DOMContentLoaded", loadPendingDeposits);

async function loadPendingDeposits() {

    const requestList = document.getElementById("requestList");

    requestList.innerHTML = "<p>Loading...</p>";

    try {

        const snapshot = await get(ref(db, "pendingDeposits"));

        if (!snapshot.exists()) {

            requestList.innerHTML =
                "<p style='text-align:center;color:gray;'>No Pending Requests</p>";

            return;
        }

        requestList.innerHTML = "";

        const requests = snapshot.val();

        Object.keys(requests).forEach(id => {

            const item = requests[id];

            requestList.innerHTML += `

            <div class="request">

                <h3>${item.name || "User"}</h3>

                <p>📱 ${item.mobile || "-"}</p>

                <p>💰 ₹${Number(item.amount || 0).toLocaleString("en-IN")}</p>

                <p>📅 ${item.date || "-"}</p>

                <p><strong>Status:</strong> Pending</p>

            </div>

            `;

        });

    } catch (error) {

        console.error(error);

        requestList.innerHTML =
            "<p style='color:red;'>Failed to load requests.</p>";

    }

}