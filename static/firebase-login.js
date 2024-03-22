'use strict';

import {initializeApp} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
//import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyD5mENziNk_4r2FaQYYciFfYLCWpZaoKB0",
    authDomain: "evehicle-sp.firebaseapp.com",
    projectId: "evehicle-sp",
    storageBucket: "evehicle-sp.appspot.com",
    messagingSenderId: "888446974065",
    appId: "1:888446974065:web:45c370e11e8cf4841b43d0"
};

window.addEventListener("load", function () {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    updateUI();

    document.getElementById("login").addEventListener('click', function () {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("User logged in successfully!");
            })
            .catch((error) => {
                console.log(error.code, error.message);
            });
    });

    document.getElementById("sign-out").addEventListener('click', function () {
        signOut(auth)
            .then(() => {
                console.log("User signed out successfully!");
            })
            .catch((error) => {
                console.error("Error signing out:", error);
            });
    });

    // Listen for changes in authentication state
    onAuthStateChanged(auth, (user) => {
        updateUI(user);
    });

    function updateUI(user) {
        const loginBox = document.getElementById("login-box");
        const signOutButton = document.getElementById("sign-out");
        const links = document.querySelectorAll("a");

        if (user) {
            // User is signed in
            loginBox.style.display = "none"; // Hide login box
            signOutButton.style.display = "block"; // Show sign-out button

            // Show links
            links.forEach(link => {
                link.style.display = "block";
            });
        } else {
            // User is signed out
            loginBox.style.display = "block"; // Show login box
            signOutButton.style.display = "none"; // Hide sign-out button

            // Hide links
            links.forEach(link => {
                link.style.display = "none";
            });
        }
    }
});