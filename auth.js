// ---------------- Firebase Setup ----------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

// 🔥 Your config
const firebaseConfig = {
  apiKey: "AIzaSyAbQw2Uzbclo9uZK7Bieafon9H8Efq4-lw",
  authDomain: "crediva-1645e.firebaseapp.com",
  projectId: "crediva-1645e",
  storageBucket: "crediva-1645e.firebasestorage.app",
  messagingSenderId: "1099297853420",
  appId: "1:1099297853420:web:2abd528f9c40315acdfac9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ---------------- Signup ----------------
window.signup = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    // Save user to Firestore
    await setDoc(doc(db, "users", userCred.user.uid), {
      email: email,
      role: role,
      createdAt: new Date()
    });

    alert("Signup successful! Redirecting...");
    window.location.href = "dashboard.html"; // placeholder page
  } catch (err) {
    alert(err.message);
  }
};

// ---------------- Login ----------------
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful! Redirecting...");
    window.location.href = "dashboard.html"; // placeholder page
  } catch (err) {
    alert(err.message);
  }
};

// ---------------- Button Event Listeners ----------------
document.getElementById("signupBtn").addEventListener("click", signup);
document.getElementById("loginBtn").addEventListener("click", login);
