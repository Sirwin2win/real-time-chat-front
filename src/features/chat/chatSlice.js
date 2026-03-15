// src/store/slices/chatSlice.js                  https://real-time-chat-back.onrender.com
import { createSlice } from "@reduxjs/toolkit";
/*

axios.defaults.withCredentials = true;


Axios Interceptor (Auto Refresh)

This automatically refreshes expired tokens.

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

API.interceptors.request.use((req) => {

  const token = sessionStorage.getItem("accessToken");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});



Now add response interceptor:
API.interceptors.response.use(
  (res) => res,
  async (error) => {

    if (error.response.status === 401) {

      const refresh = await axios.get("/refresh", {
        withCredentials: true
      });

      const newToken = refresh.data.accessToken;

      sessionStorage.setItem("accessToken", newToken);

      error.config.headers.Authorization = `Bearer ${newToken}`;

      return axios(error.config);
    }

    return Promise.reject(error);
  }
);




*/

const initialState = {
  conversations: [],
  selectedConversation: null,
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
      state.messages = []; // reset messages when conversation changes
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { setConversations, setSelectedConversation, setMessages, addMessage } =
  chatSlice.actions;

export default chatSlice.reducer;

