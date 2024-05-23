import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: { items: [], itemToUpdate: 0, pageNumber: 0, year: 2024, maxPage: 0 },
  reducers: {
    fetchExpenses(state, action) {
      state.items = action.payload;
    },
    addExpense(state, action) {
      const isExisting = state.items.some((item) => {
        return item.id === action.payload.id;
      });

      if (!isExisting) {
        state.items = [action.payload, ...state.items];
      }
    },
    deleteExpense(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setItemToUpdate(state, action) {
      state.itemToUpdate = action.payload;
    },
    updateExpenseItem(state, action) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      state.items[index] = {
        id: action.payload.id,
        title: action.payload.title,
        price: action.payload.price,
        date: action.payload.date,
      };
    },
    increasePageNumber(state) {
      state.pageNumber++;
    },
    decreasePageNumber(state) {
      state.pageNumber--;
    },
    setYear(state, action) {
      state.year = action.payload;
    },
    setMaxPages(state, action) {
      state.maxPage = action.payload;
    },
    setInitialStateOnLogout(state) {
      state.items = [];
      state.itemToUpdate = 0;
      state.pageNumber = 0;
      state.year = 2024;
      state.maxPage = 0;
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice;
