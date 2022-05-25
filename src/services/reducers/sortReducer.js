import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sort: ['price'],
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    sort(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.sort = action.payload;
    },
  },
});

export const { sort } = sortSlice.actions;
export default sortSlice.reducer;
