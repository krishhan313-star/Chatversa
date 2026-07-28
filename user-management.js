import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

 import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDe3ahkE9wEpUOYwt8dnUiFhUAYI1X3i7E",
    authDomain: "chatversa-ca526.firebaseapp.com",
    projectId: "chatversa-ca526",
    storageBucket: "chatversa-ca526.firebasestorage.app",
    messagingSenderId: "735371121479",
    appId: "1:735371121479:web:230385acffc8a7c3e8f262"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let allUsers = [];

const userList = document.getElementById("userList");

async function loadUsers() {

    try {

        const snapshot = await getDocs(collection(db, "users"));

        allUsers = [];

        snapshot.forEach((doc) => {
            allUsers.push(doc.data());
        });

        displayUsers(allUsers);

    } catch (error) {

        alert("Error : " + error.message);

    }

}

function displayUsers(users) {

    userList.innerHTML = "";

    if (users.length === 0) {

        userList.innerHTML = `
        <div class="user-card">
        <h3>No User Found</h3>
        </div>
        `;

        return;
    }

    users.forEach((user) => {

        let email = user.email || "No Email";
let username = email.includes("@")
    ? email.split("@")[0]
    : "Unknown User";

        userList.innerHTML += `
        <div class="user-card">

            <h3>👤 ${username}</h3>

            <div class="info">
            📧 ${email}
            </div>

            <div class="info">
            🛡️ Role : ${user.role}
            </div>

  <button class="btn warning">
⚠️ Send Warning
</button>

<button
class="btn ban"
onclick="banUser('${email}')">
🚫 Ban User
</button>
 
        `;

    });

}
window.searchUser = function () {

    const value = document
        .getElementById("searchUser")
        .value
        .trim()
        .toLowerCase();

    if (value === "") {
        displayUsers(allUsers);
        return;
    }

     const filtered = allUsers.filter((user) => {

    if (!user.email) return false;

    const email = user.email.toLowerCase();
    const username = email.split("@")[0];

    return (
        email.includes(value) ||
        username.includes(value)
    );

});

    displayUsers(filtered);

};
window.banUser = async function(email){

    let confirmBan = confirm(
        "Ban this user?"
    );

    if(!confirmBan) return;

    const snapshot = await getDocs(collection(db,"users"));

    snapshot.forEach(async(document)=>{

        let data = document.data();

        if(data.email === email){

            await updateDoc(
                doc(db,"users",document.id),
                {
                    banned:true
                }
            );

        }

    });

    alert("User Banned Successfully");

    loadUsers();

}
loadUsers();