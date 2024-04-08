import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const appStore = configureStore({
  // this reducer is combination of different small stores or slices
  reducer: {
    cart: cartReducer,
  },
});

export default appStore;