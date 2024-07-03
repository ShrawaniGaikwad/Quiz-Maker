import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCyDiT5UZ7nj1LDG72px7RVbsIXQQ-_-eQ",
  authDomain: "quiz-maker-ab556.firebaseapp.com",
  projectId: "quiz-maker-ab556",
  storageBucket: "quiz-maker-ab556.appspot.com",
  messagingSenderId: "922937157381",
  appId: "1:922937157381:web:ce56a2c9b315f026db796c",
  measurementId: "G-9F4YV50ZFY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCyDiT5UZ7nj1LDG72px7RVbsIXQQ-_-eQ",
//   authDomain: "quiz-maker-ab556.firebaseapp.com",
//   projectId: "quiz-maker-ab556",
//   storageBucket: "quiz-maker-ab556.appspot.com",
//   messagingSenderId: "922937157381",
//   appId: "1:922937157381:web:ce56a2c9b315f026db796c",
//   measurementId: "G-9F4YV50ZFY"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);