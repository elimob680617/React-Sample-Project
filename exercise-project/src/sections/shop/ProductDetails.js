import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addItemToCart,
  removeItemFromCart,
  sendCartData,
} from "../store/slice/cart";
import { fetchProductDetails } from "../store/slice/products";

let isInitial = true;

const ProductDetails = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  console.log(params.id);
  const _id = params.id - 1;
  console.log(_id);
  const cartItems = useSelector((state) => state.cart.items);
  const data = useSelector((state) => state.products.item);
  const error = useSelector((state) => state.products.error);
  const loading = useSelector((state) => state.products.loading);

  useEffect(() => {
    dispatch(fetchProductDetails(params.id));
  }, [dispatch, params.id]);

  console.log(cartItems.findIndex((item) => item.id === params.id));

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(sendCartData(cartItems));
  }, [cartItems, dispatch]);

  const isInCart = (id) => {
    const result = cartItems.find((item) => item.id === id);
    return result;
  };

  const quantityCount = (id) => {
    const index = cartItems.findIndex((item) => item.id === id);
    if (index === -1) {
      return false;
    } else {
      return cartItems[index].quantity;
    }
  };

  const addItemHandler = () => {
    dispatch(
      addItemToCart({
        id: data.id,
        title: data.title,
        image: data.image,
        price: data.price,
      })
    );
  };

  const removeItemHandler = () => {
    dispatch(removeItemFromCart(_id));
  };

  return (
    <>
      {!loading && _id && (
        <Container>
          <Stack spacing={4} direction="row" alignItems="center">
            <img
              src={data.image}
              alt={data.title}
              width={"400px"}
              height={"400px"}
            />
            <Stack spacing={2}>
              <Typography variant="h5">{data.title}</Typography>
              <Typography variant="body1">{data.description}</Typography>
              <Typography variant="subtitle2">
                Category: {data.category}
              </Typography>

              <Stack direction={"row"} spacing={3} alignItems="center">
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: "#2e2e2e",
                    width: "50px",
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body2">{data.price}$</Typography>
                </Box>

                {!isInCart(_id) || quantityCount(_id) === 0 ? (
                  <Button size="small" onClick={addItemHandler}>
                    Add to Cart
                  </Button>
                ) : (
                  <>
                    <IconButton size="small" onClick={addItemHandler}>
                      <AddIcon />
                    </IconButton>
                    <Box>
                      <Typography>{quantityCount(_id)}</Typography>
                    </Box>
                    <IconButton size="small" onClick={removeItemHandler}>
                      <RemoveIcon />
                    </IconButton>
                  </>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Container>
      )}
      {loading && <CircularProgress color="secondary" />}
      {error && !_id && <Typography> No Products Found! </Typography>}
    </>
  );
};

export default ProductDetails;
