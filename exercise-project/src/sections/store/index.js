import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/cart";
import notificationSlice from "./slice/notification";
import productsSlice from "./slice/products";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    products: productsSlice.reducer,
    notification: notificationSlice.reducer,
  },
});

export default store;
