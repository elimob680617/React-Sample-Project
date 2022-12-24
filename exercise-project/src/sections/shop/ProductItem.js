import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../store/slice/cart";
import { Link } from "react-router-dom";

const ProductItem = (props) => {
  const { title, image, description, category, price, id } = props;

  const cartItems = useSelector((state) => state.cart.items);

  const isInCart = (id) => {
    const result = cartItems.find((item) => item.id === id);
    return result;
  };

  console.log(isInCart(id));

  const quantityCount = (id) => {
    const index = cartItems.findIndex((item) => item.id === id);
    if (index === -1) {
      return false;
    } else {
      return cartItems[index].quantity;
    }
  };

  const dispatch = useDispatch();

  const shortTitle = (title) => {
    const splitedTitle = title.split(" ");
    const newTitle = `${splitedTitle[0]} ${splitedTitle[1]}`;
    return newTitle;
  };

  const addItemHandler = () => {
    dispatch(
      addItemToCart({
        id,
        title,
        image,
        price,
      })
    );
  };

  const removeItemHandler = () => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, m: "0 auto" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image={image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {shortTitle(title)}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                "-webkit-line-clamp": "3",
                "-webkit-box-orient": "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {category} | {description}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" flex={1}>
            <Link to={`/details/${id}`}>Details</Link>
          </Button>
          {!isInCart(id) || quantityCount(id) === 0 ? (
            <Button size="small" onClick={addItemHandler}>
              Add to Cart
            </Button>
          ) : (
            <>
              <IconButton size="small" onClick={addItemHandler}>
                <AddIcon />
              </IconButton>
              <Box>
                <Typography>{quantityCount(id)}</Typography>
              </Box>
              <IconButton size="small" onClick={removeItemHandler}>
                <RemoveIcon />
              </IconButton>
            </>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default ProductItem;
