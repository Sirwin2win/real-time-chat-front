import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://real-time-chat-back.onrender.com/api/users"

axios.defaults.withCredentials = true;


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

// login users
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

// getUsers users
export const getUsers = createAsyncThunk(
    'auth/getUsers',
    async(_,thunkAPI)=>{
        try {
        const response = await axios.get(`${API}/all`)
        return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(
   error.response?.data?.message || error.message
 )
        }
    }
)
// refresh users
export const refresh = createAsyncThunk(
    'auth/refresh',
    async(_,thunkAPI)=>{
        try {
        const response = await axios.post(`${API}/refresh`)
        return response.data.accessToken
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
    status:'idle',
    error:null,
    users:[]
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
            // state.token = action.payload.token
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
            state.user = action.payload.user
        })
        .addCase(login.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.payload
        })
        // refresh
        .addCase(refresh.pending, (state) => {
        state.status = 'loeding';
        state.error = null
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accessToken = action.payload;
      })
      .addCase(refresh.rejected, (state,action) => {
        state.status = 'failed';
        state.error = action.payload
      })
      // getUsers
      .addCase(getUsers.pending,(state)=>{
        state.status = 'loading'
        state.error = null
      })
      .addCase(getUsers.fulfilled,(state,action)=>{
        state.status = 'succeeded'
        state.users = action.payload
      })
      .addCase(getUsers.rejected,(state,action)=>{
        state.status = 'failed'
        state.error = action.payload
      })
    }
})
export default authSlice.reducer