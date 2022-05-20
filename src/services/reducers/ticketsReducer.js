import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { guestSession, getTickets } from "../services";

const initialState = {
  tickets: [],
  status: "idle",
  sessionID: "",
  error: null,
};

export const getSession = createAsyncThunk(async () => {
  const sessionID = await guestSession();

  return sessionID.searchId;
});

export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async () => {
    const sessionID = await guestSession();
    const response = await getTickets(sessionID.searchId);
    return response.tickets;
  }
);

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    getTickets(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTickets.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tickets = state.tickets.concat(action.payload);
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ticketsSlice.reducer;
