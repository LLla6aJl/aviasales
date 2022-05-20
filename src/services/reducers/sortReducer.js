import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sort: ["price"],
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    sort(state, action) {
      state.sort = action.payload;
    },
  },
});

export const { sort } = sortSlice.actions;
export default sortSlice.reducer;
