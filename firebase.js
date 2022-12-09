import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";

// https://firebase.google.com/docs/web/setup#available-libraries

  const firebaseConfig = {
  apiKey: "AIzaSyAum9V6vgZZ1t6Ihu-5nN8cVVSSs3OZJ-4",
  authDomain: "mipremeravezfirebase.firebaseapp.com",
  projectId: "mipremeravezfirebase",
  storageBucket: "mipremeravezfirebase.appspot.com",
  messagingSenderId: "80032944318",
  appId: "1:80032944318:web:fb8049fb963ca69a244eef",
  measurementId: "G-MDGWKG3W5N" 
}; 
  export const app = initializeApp(firebaseConfig);