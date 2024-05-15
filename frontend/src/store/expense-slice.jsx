import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: { items: [], pageSize: 10 },
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
    increasePageSize(state, action) {
      state.pageSize = action.payload;
    },
    setInitialStateOnLogout(state) {
      state.items = [];
      state.pageSize = 10;
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice;
