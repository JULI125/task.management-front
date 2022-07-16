import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID
};

const app = initializeApp(firebaseConfig);
const auth  = getAuth(app);

const createUser = async (email, password) => {
  const response = await createUserWithEmailAndPassword(auth, names, lastName, email, password)
      .then(userCredential => {
          const user = userCredential.user;
          return { error: false, data: user }
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          return { error: true, data: error }
      });

  return response;
};

const logIn = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          const user = userCredential.user;
          return { error: false, data: user }
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          return { error: true, data: error }
      });
  return result;
};

export{ createUser, logIn};