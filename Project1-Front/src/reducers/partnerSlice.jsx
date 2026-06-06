import { createSlice } from "@reduxjs/toolkit";
import { currentPartner } from "./partnerAction";

let partnerSlice=createSlice({
    name:"partner",
    initialState:{
        partner:null,
        isLoading:true
    },
    reducers:{
        setPartner:(state,action)=>{
            state.partner=action.payload
            state.isLoading=false
        },
        removePartner:(state)=>{
            state.partner=null
            state.isLoading=false
        },
        setLoading:(state)=>{
            state.isLoading=false;
        }
    },
    extraReducers:(builder)=>{
        builder.
        addCase(currentPartner.pending,(state)=>{
           
            state.isLoading=true
        })
        .addCase(currentPartner.fulfilled,(state,action)=>{
          
            state.partner=action.payload
            state.isLoading=false
        })
        .addCase(currentPartner.rejected,(state)=>{
           
            state.partner=null
            state.isLoading=false
        })
    }
})

export const {setPartner,removePartner,setLoading}=partnerSlice.actions
export default partnerSlice.reducer