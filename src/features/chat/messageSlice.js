import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const API = "https://real-time-chat-back.onrender.com/api/users"

axios.defaults.withCredentials = true;
