import { createSlice } from "@reduxjs/toolkit";

const earningsSlice = createSlice({
  name: "earning",
  initialState: { items: [] },
  reducers: {
    fetchEarnings(state, action) {
      state.items = action.payload;
    },
    addEarnings(state, action) {
      const isExisting = state.items.some((item) => {
        return item.id === action.payload.id;
      });

      if (!isExisting) {
        state.items.push(action.payload);
      }
    },
    deleteEarning(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setInitialStateOnLogout(state) {
      state.items = [];
    },
  },
});

export const earningsActions = earningsSlice.actions;

export default earningsSlice;
