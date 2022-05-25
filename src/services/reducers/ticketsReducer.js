/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { guestSession, getTickets } from '../services';

const initialState = {
  tickets: [],
  status: 'idle',
  sessionID: '',
  stopFetch: 'false',
  ticketsCount: 5,
  error: null,
};

export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async () => {
    const sessionID = await guestSession();
    const response = await getTickets(sessionID.searchId);
    return [response, sessionID.searchId];
  }
);

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    getFullTickets(state, action) {
      state.tickets = state.tickets.concat(action.payload.tickets);
      state.stopFetch = action.payload.stop;
    },
    getMoreTickets(state, action) {
      state.ticketsCount = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stopFetch = action.payload[0].stop;
        // eslint-disable-next-line prefer-destructuring
        state.sessionID = action.payload[1];
        state.tickets = state.tickets.concat(action.payload[0].tickets);
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export const { getFullTickets, getMoreTickets } = ticketsSlice.actions;
export default ticketsSlice.reducer;
