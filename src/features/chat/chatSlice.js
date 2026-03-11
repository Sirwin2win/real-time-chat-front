// src/store/slices/chatSlice.js
import { createSlice } from "@reduxjs/toolkit";

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