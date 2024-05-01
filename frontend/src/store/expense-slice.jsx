import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: { items: [], lastId: null },
  reducers: {
    fetchExpenses(state, action) {
      state.items = action.payload;
    },
    addExpense(state, action) {
      const isExisting = state.items.some((item) => {
        return item.id === action.payload.id;
      });

      if (!isExisting) {
        state.items.push(action.payload);
      }
    },
    deleteExpense(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice;
