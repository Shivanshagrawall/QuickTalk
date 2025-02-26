// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {getFirestore, setDoc,doc, collection, query, where, getDocs} from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7BYz4aXbQ1uZCWyCMaZP46atTm5H0aOM",
  authDomain: "quicktalk-15618.firebaseapp.com",
  projectId: "quicktalk-15618",
  storageBucket: "quicktalk-15618.firebasestorage.app",
  messagingSenderId: "532375510049",
  appId: "1:532375510049:web:21e41a17de548088c85760"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);

const signup=async(username,email,password)=>{
    try {
        const res=await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await setDoc(doc(db,"users",user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"Hey, There i am using chat app",
            lastSeen:Date.now(),
        })
        await setDoc(doc(db,"chats",user.uid),{
            chatsData:[],

        })
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const loginUser =async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout=async()=>{
    try {
        await signOut(auth);
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
    
}

const resetPass=async(email)=>{
    if(!email){
        toast.error("Enter your Email");
        return null;
    }
    try {
        const userRef=collection(db,"users");
        const q=query(userRef,where("email","==",email));
        const querySnap=await getDocs(q);
        if(!querySnap.empty){
            await sendPasswordResetEmail(auth,email);
            toast.success("Reset Email Send")
        }else{
            toast.error("Email Doesnot exists");
        }
    } catch (error) {
        toast.error(error.message);
    }
}

export {signup,loginUser,logout,auth,db,resetPass}