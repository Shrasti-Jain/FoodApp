import { createSlice } from "@reduxjs/toolkit";
import { currentUser } from "./authAction";

let userSlice=createSlice({
    name:"user",
    initialState:{
        user:null,
        isLoading:true
    },
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
            state.isLoading=false
        },
        removeUser:(state)=>{
            state.user=null
            state.isLoading=false
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(currentUser.pending,(state)=>{
           
            
            state.isLoading=true
        })
        .addCase(currentUser.fulfilled,(state,action)=>{
            
            state.user=action.payload,
            state.isLoading=false
        })
        .addCase(currentUser.rejected,(state)=>{
            
            state.user=null
            state.isLoading=false
        })
    }
})

export const {setUser,removeUser}=userSlice.actions
export default userSlice.reducer