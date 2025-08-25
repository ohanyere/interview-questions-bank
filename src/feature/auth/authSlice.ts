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

export const signIn = createAsyncThunk<{name: string, email: string},{email: string, password: string}, {rejectValue : string} >("auth/signin", async(userData, thunkAPI) => {
    
  try {
    const {email, password } = userData
        return await loginUser(email, password)
  } catch (error) {
    if(error instanceof Error){
      return thunkAPI.rejectWithValue(error.message)
    }
    return thunkAPI.rejectWithValue("failed to sign in ")
    
  }
})

export const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
      reset : (state) => {
        state.isSucess = false;
        state.user = null
        state.isError = false;
      },
      sigOut : (state) => {
        signOut()
        state.user = null
      }
    },
     extraReducers : (builder) => {
        builder
        .addCase(signUp.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(signUp.fulfilled, (state , action ) => {
            state.user = action.payload;
            state.isLoading = false;
            state.isSucess = true;
        })
        .addCase(signUp.rejected, (state, action ) => {
            state.isError = true;
            state.message = action.payload ?? "unknowned error occured";
            state.isLoading = false;
            state.isSucess= false;
            state.user = null;
        })
         .addCase(signIn.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(signIn.fulfilled, (state, action ) => {
            state.user = action.payload;
            state.isLoading = false;
            state.isSucess = true;
        })
        .addCase(signIn.rejected, (state, action) => {
            state.isError = true;
            state.message = action.payload ?? "unknowned error occured";
            state.isLoading = false;
            state.isSucess = false;
        })
    }
    
})
export const {sigOut, reset} = authSlice.actions
export default authSlice.reducer