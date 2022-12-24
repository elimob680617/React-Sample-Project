import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Badge,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Notification from "../components/Notification";

const MainNavigation = () => {
  const cardQuantity = useSelector((state) => state.cart.totalQuantity);
  const notification = useSelector((state) => state.notification.notification);

  return (
    <>
      <AppBar position="fixed">
        {notification && (
          <Notification
            title={notification.title}
            status={notification.status}
            message={notification.message}
          />
        )}

        <Container maxWidth="lg">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" color="inherit" component="div" flex={1}>
              <Link to="/">Products</Link>
            </Typography>

            <Link to="/cart">
              <Badge badgeContent={cardQuantity} color="secondary">
                <AddShoppingCartIcon color="action" />
              </Badge>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default MainNavigation;
