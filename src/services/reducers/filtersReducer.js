import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { label: "Без пересадок", id: "2", isChecked: false },
  { label: "1 пересадка", id: "3", isChecked: false },
  { label: "2 пересадки", id: "4", isChecked: false },
  { label: "3 пересадки", id: "5", isChecked: false },
];

const filterSlice = createSlice({
  name: "filtered",
  initialState,
  reducers: {
    noTransfer(state, action) {
      !state.filtered[0].isChecked;
    },
    oneTransfer(state, action) {
      state.filtered = action.payload;
    },
    twoTransfer(state, action) {
      state.filtered = action.payload;
    },
    threeTransfer(state, action) {
      state.filtered = action.payload;
    },
  },
});

export const { filtered } = filterSlice.actions;
export default filterSlice.reducer;
