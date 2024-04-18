import { createSlice } from "@reduxjs/toolkit";

const earningsSlice = createSlice({
  name: "earning",
  initialState: { items: [], lastId: null },
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
    setLastId(state, action) {
      state.lastId = action.payload;
    },
  },
});

export const earningsActions = earningsSlice.actions;

export default earningsSlice;
