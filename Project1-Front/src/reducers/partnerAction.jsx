import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config/axiosInstance";


export let currentPartner=createAsyncThunk("partner/me",async (_,thunkApi)=>{
    try {
      
        
        let res=await axiosInstance.get('/partner',{
    skipDispatch: true
  })
        
        return res.data.data
    } catch (error) {
         return thunkApi.rejectWithValue(error)
    }
})