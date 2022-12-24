import { CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData, sendCartData } from "../store/slice/cart";
import { fetchProductData } from "../store/slice/products";
import ProductItem from "./ProductItem";

let isInitial = true;

const Products = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(sendCartData(cartItems));
  }, [cartItems, dispatch]);

  useEffect(() => {
    dispatch(fetchProductData());
  }, [dispatch]);

  const productState = useSelector((state) => state.products);

  return (
    <>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {!productState.loading &&
          productState.items.length > 0 &&
          productState.items.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <ProductItem
                id={item.id}
                title={item.title}
                price={item.price}
                category={item.category}
                description={item.description}
                image={item.image}
              />
            </Grid>
          ))}
        {productState.error && productState.items.length === 0 && (
          <Typography>No Products Found!</Typography>
        )}
        {productState.loading && <CircularProgress color="secondary" />}
      </Grid>
    </>
  );
};

export default Products;
