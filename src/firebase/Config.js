
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDU8q9NjCA72O6d1Rq22Imzh0u01xj2n20",
  authDomain: "olx-clone-70744.firebaseapp.com",
  projectId: "olx-clone-70744",
  storageBucket: "olx-clone-70744.appspot.com",
  messagingSenderId: "163286310541",
  appId: "1:163286310541:web:50552847323a4e8b4c4cc4",
  measurementId: "G-XXQ6N8FFLK"
  
};

 const app = initializeApp(firebaseConfig);
 export const auth=getAuth(app)
 export const db = getFirestore(app)
 export const storage=getStorage(app)
 export default app




