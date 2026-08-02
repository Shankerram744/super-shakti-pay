import { db, ref, onValue } from "./firebase.js";

const mobile = localStorage.getItem("userMobile");


if (!mobile) {

    window.location.href = "login.html";

}



const historyRef = ref(db, "history/" + mobile);



onValue(historyRef, (snapshot) => {


    const historyList = document.getElementById("historyList");


    historyList.innerHTML = "";


    if (!snapshot.exists()) {


        historyList.innerHTML = `

        <div class="history-card">

            <div class="left">

                <h3>No Transactions</h3>

                <p>Your transaction history is empty.</p>

            </div>

        </div>

        `;


        return;

    }



    const data = snapshot.val();



    Object.values(data).reverse().forEach((item) => {



        let color = "green";


        if(item.status === "Pending"){

            color = "#ff9800";

        }


        if(item.status === "Rejected"){

            color = "red";

        }



        historyList.innerHTML += `


        <div class="history-card">


            <div class="left">

                <h3>
                ${item.type || "Transaction"}
                </h3>


                <p>
                ${item.date || ""}
                </p>


            </div>



            <div class="right">


                <div class="amount" style="color:${color};">

                ₹ ${item.amount}

                </div>


                <div class="status" style="color:${color};">

                ${item.status}

                </div>


            </div>


        </div>


        `;



    });



});