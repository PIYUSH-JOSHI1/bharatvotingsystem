// Firebase Authentication Script
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDO7yFIllU3udhAtJP0f6wFu7QvsXXzP1o",
  authDomain: "ksp-traffic-control-ff5ac.firebaseapp.com",
  projectId: "ksp-traffic-control-ff5ac",
  storageBucket: "ksp-traffic-control-ff5ac.appspot.com",
  messagingSenderId: "307072623604",
  appId: "1:307072623604:web:62ee9977aa9634bece0fa1",
  measurementId: "G-TYW5L6YZNW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

// Create toast notification function
function showToast(message, type = 'error') {
  // Remove any existing toasts
  const existingToasts = document.querySelectorAll('.toast');
  existingToasts.forEach(toast => toast.remove());

  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg ${
    type === 'success' 
      ? 'bg-green-500 text-white' 
      : 'bg-red-500 text-white'
  }`;
  toast.textContent = message;

  // Append to body
  document.body.appendChild(toast);

  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-x-full');
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// Email/Password Login
document.getElementById('signup')?.addEventListener('click', (e) => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Validate inputs
  if (!email || !password) {
    showToast('Please enter both email and password');
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showToast('Login successful', 'success');
      setTimeout(() => {
        window.location.href = "./home/index.html";
      }, 1500);
    })
    .catch((error) => {
      const errorMessage = error.message;
      showToast(errorMessage);
    });
});

// Google Login
document.getElementById('google')?.addEventListener('click', () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      showToast('Google Login Successful', 'success');
      setTimeout(() => {
        window.location.href = "./home/index.html";
      }, 1500);
    })
    .catch((error) => {
      const errorMessage = error.message;
      showToast(errorMessage);
    });
});

// Optional: Add form validation
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('invalid', (e) => {
    e.preventDefault();
    showToast('Please fill out all required fields');
  });
});


