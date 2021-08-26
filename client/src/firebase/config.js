import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBilWNu9UAvAEYXNk9IU30ekyfmotRKYT0",
  authDomain: "hairdress-shop.firebaseapp.com",
  projectId: "hairdress-shop",
  storageBucket: "hairdress-shop.appspot.com",
  messagingSenderId: "14406057952",
  appId: "1:14406057952:web:aca2fe3aa6af2483977585",
};

firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();

export { projectStorage };
