import { configureStore } from "@reduxjs/toolkit";

import modalSlice from "./modal-slice";
import authSlice from "./auth-slice";

const store = configureStore({
  reducer: { modal: modalSlice.reducer, auth: authSlice.reducer },
});

export default store;
