import { configureStore } from "@reduxjs/toolkit";

import modalSlice from "./modal-slice";
import authSlice from "./auth-slice";
import expenseSlice from './expense-slice'
import earningsSlice from "./earnings-slice";

const store = configureStore({
  reducer: { modal: modalSlice.reducer, auth: authSlice.reducer, expense: expenseSlice.reducer, earning: earningsSlice.reducer },
});

export default store;
