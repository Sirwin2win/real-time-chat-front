// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../chat/chatSlice";
import authSlice from '../auth/authSlice'

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    auth:authSlice
  },
});