import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDXW8wYnFvvItdpD5_z5-hmc11S8f8Uav8",
    authDomain: "news-search-213c7.firebaseapp.com",
    databaseURL: "https://news-search-213c7-default-rtdb.firebaseio.com",
    projectId: "news-search-213c7",
    storageBucket: "news-search-213c7.appspot.com",
    messagingSenderId: "216245218493",
    appId: "1:216245218493:web:feb704df4eb4f22fab5bd4",
    measurementId: "G-T497GBVNKG"
  };
 
  const newsapp = initializeApp(firebaseConfig)
  // const analytics = getAnalytics(newsapp);
  export const auth = getAuth(newsapp);
  export const db = getFirestore(newsapp)