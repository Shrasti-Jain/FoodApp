import { createSlice } from "@reduxjs/toolkit";

let errorSlice=createSlice({
    name:"error",
    initialState:{
        error:null
    },
    reducers:{
        setError:(state,action)=>{
            state.error=action.payload
        },
        removeError:(state)=>{
            state.error=null
        }
    }
})

export const {setError,removeError}=errorSlice.actions
export default errorSlice.reducer

