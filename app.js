import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
   import {
   getFirestore,
doc,
setDoc,
getDoc,
serverTimestamp
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
const auth = getAuth(app);
const db = getFirestore(app);

const email = document.getElementById("email");
const password = document.getElementById("password");
const rememberMe = document.getElementById("rememberMe");
const inviteCode = document.getElementById("inviteCode");
const signup = document.getElementById("signup");
const login = document.getElementById("login");
const status = document.getElementById("status");

signup.onclick = async () => {

  if (inviteCode.value !== "puttar") {
    status.innerText = "❌ Invalid Invite Code!";
    return;
  }

  try {
     const userCredential = await createUserWithEmailAndPassword(
    auth,
    email.value,
    password.value
);

 await setDoc(doc(db, "users", userCredential.user.uid), {
    email: email.value.toLowerCase(),
    role: email.value.toLowerCase() === "krishhan313@gmail.com"
        ? "admin"
        : "user",
    approved: true,
    createdAt: serverTimestamp()
});

    status.innerText = "✅ Account Created!";
  } catch (e) {
    status.innerText = e.message;
  }
};
// Load saved login
window.onload = () => {
    const savedEmail = localStorage.getItem("savedEmail");

    if (savedEmail) {
        email.value = savedEmail;
        rememberMe.checked = true;
    }
};
login.onclick = async () => {

  if (inviteCode.value !== "puttar") {
    status.innerText = "❌ Invalid Invite Code!";
    return;
  }

  try {
     const userCredential = await signInWithEmailAndPassword(
    auth,
    email.value,
    password.value
);

const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));

if (userDoc.exists()) {

    const userData = userDoc.data();

    if (userData.banned === true) {

        status.innerText = "🚫 Your account has been banned.";

        await auth.signOut();

        return;
    }

}

localStorage.setItem("userEmail", email.value);
localStorage.setItem("userEmail", email.value);
 if (email.value.toLowerCase() === "krishhan313@gmail.com") {
    localStorage.setItem("role", "admin");
    console.log("Role saved:", localStorage.getItem("role"));
} else {
    localStorage.setItem("role", "user");
}
if (rememberMe.checked) {
    localStorage.setItem("savedEmail", email.value);
} else {
    localStorage.removeItem("savedEmail");
}
     window.location.href = "home.html";

  } catch (e) {
    status.innerText = e.message;
  }
};