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

export const registerUser = async(email: string , password : string , Name : string) : Promise<{name: string, email:string}> => {
    console.log(Name)
    const userCredencial = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredencial.user
    console.log(user);
    
    updateProfile(auth.currentUser, {displayName : Name})
    const docRef = doc(db, "users", user.uid)
    await setDoc(docRef, {
        name : Name,
        email: user.email,
        createdAt : serverTimestamp()
    })

    return {
        name : user.displayName ?? Name,
        email : user.email ?? email,
    }
   
}