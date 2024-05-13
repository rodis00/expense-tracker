import { createSlice } from "@reduxjs/toolkit";

const allExpensesSlice = createSlice({
  name: "allExpenses",
  initialState: { items: [] },
  reducers: {
    fetchAllExpenses(state, action) {
      state.items = action.payload;
    },
    setInitialStateOnLogout(state) {
      state.items = [];
    },
  },
});

export const allExpensesActions = allExpensesSlice.actions;

export default allExpensesSlice;
