import {
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  clearItem,
  removeItemFromCart,
} from "../store/slice/cart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CartItem = (props) => {
  const { title, image, price, id, quantity, totalPrice } = props;

  const dispatch = useDispatch();

  const addItemHandler = () => {
    dispatch(
      addItemToCart({
        id,
        title,
        image,
        price,
        quantity,
      })
    );
  };

  const removeItemHandler = () => {
    dispatch(removeItemFromCart(id));
  };

  const clearItemHandler = () => {
    dispatch(clearItem(id));
  };

  return (
    <>
      {quantity >= 1 && (
        <Paper
          variant="outline"
          elevation={3}
          sx={{ p: 1, m: 1, border: "1px solid #f1f1f1" }}
          alignItems="center"
        >
          <Stack
            direction={"row"}
            spacing={3}
            justifyContent="space-between"
            alignItems="center"
          >
            <img src={image} alt={title} width={"100px"} height={"auto"} />
            <Stack spacing={3}>
              <Stack spacing={2}>
                <Typography gutterBottom variant="h5" component="div">
                  {title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {price} $
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction={"row"}
              spacing={1}
              justifyContent="flex-end"
              alignItems="center"
            >
              <Typography variant="body2" color="text.secondary">
                {totalPrice.toFixed(2)}$
              </Typography>
              <IconButton onClick={addItemHandler}>
                <AddIcon />
              </IconButton>
              <Box>{quantity}</Box>
              <IconButton onClick={removeItemHandler}>
                <RemoveIcon />
              </IconButton>
            </Stack>
            <Button onClick={clearItemHandler}>X</Button>
          </Stack>
        </Paper>
      )}
    </>
  );
};

export default CartItem;
