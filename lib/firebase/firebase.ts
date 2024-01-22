import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmvuyJjAO9fwD3m8FAHo9iTJOGj5LC8_c",
  authDomain: "my-projects-a1aa5.firebaseapp.com",
  projectId: "my-projects-a1aa5",
  storageBucket: "my-projects-a1aa5.appspot.com",
  messagingSenderId: "374744523189",
  appId: "1:374744523189:web:f0646f9e972c55a68e79fc",
  measurementId: "G-8GEY6MYXEG",
};

const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export { auth, googleProvider, githubProvider };
