import { createSlice } from "@reduxjs/toolkit";
import { showNotification } from "./notification";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalAmount += newItem.price;
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          totalPrice: newItem.price,
          image: newItem.image,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.totalAmount -= existingItem.price;
      if (!existingItem) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
    clearItem(state, action) {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      state.totalQuantity = state.totalQuantity - item.quantity;
      state.totalAmount = state.totalAmount - item.price * item.quantity;
      item.quantity = 0;
    },
  },
});

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchCartData = async () => {
      const response = await fetch("https://fakestoreapi.com/carts");

      if (!response.ok) {
        throw new Error("Could not Fetch Cart Data");
      }

      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchCartData();
      dispatch(replaceCart(cartData));
    } catch (error) {
      dispatch(
        showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching Cart Data Failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending Cart Data",
      })
    );
    const sendRequest = async () => {
      const response = await fetch("https://fakestoreapi.com/carts", {
        method: "POST",
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error("Sending Cart Data Failed");
      }
    };

    try {
      await sendRequest();
      dispatch(
        showNotification({
          status: "success",
          title: "Success!",
          message: "Sent Cart Data Successfully!",
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          status: "error",
          title: "Error!",
          message: "Sending Cart Data Failed!",
        })
      );
    }
  };
};

export const { addItemToCart, removeItemFromCart, replaceCart, clearItem } =
  cartSlice.actions;

export default cartSlice;
