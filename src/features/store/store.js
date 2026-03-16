// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import conversationSlice from "../chat/conversationSlice";
import authSlice from '../auth/authSlice'

export const store = configureStore({
  reducer: {
    conversation: conversationSlice,
    auth:authSlice
  },
});