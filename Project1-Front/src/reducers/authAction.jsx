import {createAsyncThunk} from '@reduxjs/toolkit'
import { axiosInstance } from '../config/axiosInstance';
import { setLoading } from './partnerSlice';

export let currentUser=createAsyncThunk("auth/me",async (_,thunkApi)=>{
    try {
        let res=await axiosInstance.get('/me',{
         skipDispatch: true
        })   
        thunkApi.dispatch(setLoading())
        return res.data.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})