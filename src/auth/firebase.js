import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {

  // apiKey: process.env.REACT_APP_apiKey,
  // authDomain: process.env.REACT_APP_authDomain,
  // projectId: process.env.REACT_APP_projectId,
  // storageBucket: process.env.REACT_APP_storageBucket,
  // messagingSenderId: process.env.REACT_APP_messagingSenderId,
  // appId: process.env.REACT_APP_appId,

    apiKey: "AIzaSyDT3fgMBWltSSgpkvOGZL3QbPUm11bMhRI",
    authDomain: "movie-app-react-b43ba.firebaseapp.com",
    projectId: "movie-app-react-b43ba",
    storageBucket: "movie-app-react-b43ba.appspot.com",
    messagingSenderId: "134421636946",
    appId: "1:134421636946:web:a9c7efdc03e774f4a9bc8b"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export const createUser = async (email, password, displayName, navigate) => {
  try {
    //? yeni bir kullanıcı oluşturmak için kullanılan firebase metodu
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    //? kullanıcı profilini güncellemek için kullanılan firebase metodu
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
    navigate("/");
    // toastSuccessNotify("Registered successfully!");
    console.log(userCredential);
  } catch (err) {
    // toastErrorNotify(err.message);
    // alert(err.message);
  }
};

export const signIn = async (email, password, navigate) =>{
  try {
    let userCredential = await signInWithEmailAndPassword(auth, email, password)
    navigate("/")
    console.log(userCredential);
  } catch (err) {
    
    alert(err.message);
    }
  }

  export const logOut = () => {
    signOut(auth)
    alert("Logged out succesfully!!")
  }

  export const userObserver = (setCurrentUser) => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setCurrentUser(currentUser)
      } else {
        //when user signed out
        setCurrentUser(false);
      }
    });
  };

  export const signUpProvider = (navigate) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
  .then((result) => {
    console.log(result);
    navigate("/")
  }).catch((error) => {
    // Handle Errors here.
    console.log(error);
    // ...
  });
  }
  
