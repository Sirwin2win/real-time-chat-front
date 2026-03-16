// src/features/conversations/conversationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { io } from "socket.io-client";

// Initialize Socket.IO client

//const API = 'https://real-time-chat-back.onrender.com/api'

axios.defaults.withCredentials = true;
const socket = io("https://real-time-chat-back.onrender.com/api"); // Replace with your backend URL

// --- Async thunk to fetch user conversations ---
export const fetchConversations = createAsyncThunk(
  "conversations/fetchConversations",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/conversations/${userId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// --- Async thunk to create a conversation ---
export const createConversation = createAsyncThunk(
  "conversations/createConversation",
  async (conversationData, thunkAPI) => {
    try {
      const response = await axios.post("/api/conversations", conversationData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// --- Conversation slice ---
const conversationSlice = createSlice({
  name: "conversations",
  initialState: {
    conversations: [],
    loading: false,
    error: null,
  },
  reducers: {
    addConversationRealtime: (state, action) => {
      // Prevent duplicate conversations (same _id)
      const exists = state.conversations.find(c => c._id === action.payload._id);
      if (!exists) {
        state.conversations.unshift(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Conversations
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Conversation
      .addCase(createConversation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createConversation.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations.unshift(action.payload);
      })
      .addCase(createConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// --- Socket.IO listener for real-time conversations ---
export const listenForNewConversations = (userId) => (dispatch) => {
  socket.emit("joinRoom", userId); // Join room with userId

  socket.on("newConversation", (conversation) => {
    dispatch(conversationSlice.actions.addConversationRealtime(conversation));
  });
};

export const { addConversationRealtime } = conversationSlice.actions;
export default conversationSlice.reducer;
