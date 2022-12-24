import { Grid, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from "../store/slice/cart";
import CartItem from "./CartItem";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const cartAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={8}>
        {cartQuantity === 0 && <Typography>The Cart is empty!</Typography>}
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            image={item.image}
            quantity={item.quantity}
            totalPrice={item.totalPrice}
          />
        ))}
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Paper
          variant="outline"
          elevation={3}
          sx={{ p: 1, m: 1, border: "1px solid #f1f1f1" }}
          alignItems="center"
        >
          <Stack spacing={2}>
            <Typography variant="h6">
              Total Quantity : {cartQuantity}
            </Typography>

            <Typography variant="h5">
              Total Amount : {cartAmount.toFixed(2)}
            </Typography>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Cart;
