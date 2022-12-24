import { Container } from "@mui/material";
import React from "react";
import MainNavigation from "./MainNavigation";
import { Outlet } from "react-router-dom";
import Notification from "../components/Notification";

const Layout = ({ children }) => {
  return (
    <>
      <MainNavigation />
      <Container maxWidth="lg" sx={{ mt: 30 }}>
        {children}
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
