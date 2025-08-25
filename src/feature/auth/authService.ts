import {getAuth,updateProfile, signInWithEmailAndPassword, createUserWithEmailAndPassword,} from "firebase/auth";
import { setDoc, doc,  serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase.config";

const auth =  getAuth()

export const loginUser = async (email : string, password : string) => {
    const userCredencial = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredencial.user
    return {
        name : user.displayName ?? "",
        email : user.email ?? "",
    }
}

export const signOut = () => {
  return  auth.signOut()
}