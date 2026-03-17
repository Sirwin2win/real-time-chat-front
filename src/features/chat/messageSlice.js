import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

// --- Fetch Messages ---
export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (conversationId, thunkAPI) => {
    try {
      const res = await axios.get(`/api/messages/${conversationId}`);
      return { conversationId, messages: res.data };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// --- Send Message ---
export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`/api/messages`, data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    messagesByConversation: {}, // key: conversationId
    fetchStatus: "idle",
    sendStatus: "idle",
    error: null,
  },
  reducers: {
    // --- Realtime Incoming Message ---
    addMessageRealtime: (state, action) => {
      const msg = action.payload;
      const convId = msg.conversationId;

      if (!state.messagesByConversation[convId]) {
        state.messagesByConversation[convId] = [];
      }

      const exists = state.messagesByConversation[convId].some(
        (m) => m._id === msg._id
      );

      if (!exists) {
        state.messagesByConversation[convId].push(msg);
      }
    },

    // Optional: clear messages when leaving chat
    clearMessages: (state, action) => {
      const conversationId = action.payload;
      delete state.messagesByConversation[conversationId];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchMessages.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        const { conversationId, messages } = action.payload;
        state.messagesByConversation[conversationId] = messages;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload;
      })

      // Send
      .addCase(sendMessage.pending, (state) => {
        state.sendStatus = "loading";
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sendStatus = "succeeded";
        const msg = action.payload;
        const convId = msg.conversationId;

        if (!state.messagesByConversation[convId]) {
          state.messagesByConversation[convId] = [];
        }

        state.messagesByConversation[convId].push(msg);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sendStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  addMessageRealtime,
  clearMessages,
} = messageSlice.actions;

export default messageSlice.reducer;