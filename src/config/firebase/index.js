// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCM_CN137CQGmMM2ztjcnrn-nuaRSH2odg",
  authDomain: "fadilradit-invit.firebaseapp.com",
  projectId: "fadilradit-invit",
  storageBucket: "fadilradit-invit.appspot.com",
  messagingSenderId: "13669626939",
  appId: "1:13669626939:web:cd0a99aa34e169508a981e",
  measurementId: "G-Q4608N32YZ",
  databaseURL: "https://fadilradit-invit-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const database = getDatabase(app);

export default app;