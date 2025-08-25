import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { loginUser, registerUser , signOut} from "./authService";
import Oauth from "../../Components/Oauth";

type user = {
name : string,
email : string
}
type UserType = {
  isError : boolean,
  isLoading : boolean,
  isSucess : boolean,
  message : string,
  user : user | null
}

type useData  = {displayName : string, email: string, password : string}


const initialState : UserType = {
    user : null,
    isError : false,
    isLoading : false,
    isSucess : false,
    message : ""
}



export const signUp = createAsyncThunk< {name: string, email: string}, useData,{rejectValue :string}>("auth/signup", async(userData ,   thunkAPI)    => {
    
    
  try {
      const {email, password , displayName }= userData
        const result =  await registerUser(email, password, displayName) 
        return result
  } catch (error) {
   
    if(error instanceof Error){
      return thunkAPI.rejectWithValue(error.message) 
    }
    return thunkAPI.rejectWithValue("failed to sign up") 
    
  }
})

export const signUpWithGoogle = createAsyncThunk("auth/siginwithGoogle", async(_,  thunkAPI)    => {
    
    
  try {
      
        const fun =  await Oauth.signInWithGoogle()
        
        return fun
         
  } catch (error) {
    if(error instanceof Error){
      return thunkAPI.rejectWithValue(error.message) 
    }
     return thunkAPI.rejectWithValue("google signin failed ") 
    
  }
})
