// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import conversationSlice from "../chat/conversationSlice";
import authSlice from '../auth/authSlice'
import messageSlice from '../chat/messageSlice'

export const store = configureStore({
  reducer: {
    conversations: conversationSlice,
    auth:authSlice,
    messages:messageSlice
  },
});