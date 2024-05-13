import { createSlice } from "@reduxjs/toolkit";

const allEarningsSlice = createSlice({
  name: "allEarnings",
  initialState: { items: [] },
  reducers: {
    fetchAllEarnings(state, action) {
      state.items = action.payload;
    },
    setInitialStateOnLogout(state) {
      state.items = [];
    },
  },
});

export const allEarningsActions = allEarningsSlice.actions;

export default allEarningsSlice;
