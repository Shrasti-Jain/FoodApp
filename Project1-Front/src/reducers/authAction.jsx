import {createAsyncThunk} from '@reduxjs/toolkit'
import { axiosInstance } from '../config/axiosInstance';

export let currentUser=createAsyncThunk("auth/me",async (_,thunkApi)=>{
    try {
       
        
        let res=await axiosInstance.get('/me',{
    skipDispatch: true
  })
        return res.data.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})