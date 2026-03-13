import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://real-time-chat-back.onrender.com/api/users"

// register users
export const register = createAsyncThunk(
    'auth/register',
    async(forms,thunkAPI)=>{
        try {
        const response = await axios.post(`${API}/register`,forms)
        return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(
   error.response?.data?.message || error.message
 )
        }
    }
)

// register users
export const login = createAsyncThunk(
    'auth/login',
    async(forms,thunkAPI)=>{
        try {
        const response = await axios.post(`${API}/login`,forms)
        return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(
   error.response?.data?.message || error.message
 )
        }
    }
)

const authSlice = createSlice({
    name:'auth',
    initialState:{
    user:null,
    accessToken:null,
    status:'idle',
    error:null
}
,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        // register reducer
        .addCase(register.pending,(state)=>{
            state.status = 'loading'
            state.error = null
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.token = action.payload.token
        })
        .addCase(register.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.payload
        })
        // login reducer
        .addCase(login.pending,(state)=>{
            state.status = 'loading'
            state.error = null
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.token = action.payload.token
        })
        .addCase(login.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.payload
        })
    }
})
export default authSlice.reducer