import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

// --- Fetch Conversations ---
export const fetchConversations = createAsyncThunk(
  "conversations/fetchConversations",
  async (userId, thunkAPI) => {
    try {
      const res = await axios.get(`/api/conversations/${userId}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// --- Create Conversation ---
export const createConversation = createAsyncThunk(
  "conversations/createConversation",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`/api/conversations`, data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const conversationSlice = createSlice({
  name: "conversations",
  initialState: {
    conversations: [],
    fetchStatus: "idle",
    createStatus: "idle",
    error: null,
  },
  reducers: {
    addConversationRealtime: (state, action) => {
      const exists = state.conversations.some(
        (c) => c._id === action.payload._id
      );
      if (!exists) {
        state.conversations.unshift(action.payload);
      }
    },
    setTypingUser: (state, action) => {
    const { conversationId, user } = action.payload;
    const conv = state.conversations.find(c => c._id === conversationId);
    if (conv) {
      conv.typingUsers = conv.typingUsers || [];
      if (!conv.typingUsers.includes(user)) {
        conv.typingUsers.push(user);
      }
    }
  },

  removeTypingUser: (state, action) => {
    const { conversationId, user } = action.payload;
    const conv = state.conversations.find(c => c._id === conversationId);
    if (conv) {
      conv.typingUsers = conv.typingUsers?.filter(u => u !== user);
    }
  },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchConversations.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload;
      })

      // Create
      .addCase(createConversation.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(createConversation.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.conversations.unshift(action.payload);
      })
      .addCase(createConversation.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { addConversationRealtime } = conversationSlice.actions;
export default conversationSlice.reducer;