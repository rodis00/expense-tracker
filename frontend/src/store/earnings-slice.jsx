import { createSlice } from "@reduxjs/toolkit";

const earningsSlice = createSlice({
  name: "earning",
  initialState: {
    items: [],
    itemToUpdate: 0,
    pageNumber: 0,
    year: 2024,
    maxPage: 0,
  },
  reducers: {
    fetchEarnings(state, action) {
      state.items = action.payload;
    },
    addEarnings(state, action) {
      const isExisting = state.items.some((item) => {
        return item.id === action.payload.id;
      });

      if (!isExisting) {
        state.items = [action.payload, ...state.items];
      }
    },
    deleteEarning(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setItemToUpdate(state, action) {
      state.itemToUpdate = action.payload;
    },
    updateEarningItem(state, action) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      state.items[index] = {
        id: action.payload.id,
        title: action.payload.title,
        amount: action.payload.amount,
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

export const earningsActions = earningsSlice.actions;

export default earningsSlice;
