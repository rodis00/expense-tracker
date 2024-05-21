import { createSlice } from "@reduxjs/toolkit";

const earningsSlice = createSlice({
  name: "earning",
  initialState: { items: [], itemToUpdate: 0, pageNumber: 0 },
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
    setInitialStateOnLogout(state) {
      state.items = [];
      state.pageSize = 10;
    },
  },
});

export const earningsActions = earningsSlice.actions;

export default earningsSlice;
