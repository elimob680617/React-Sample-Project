import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";

const Notification = (props) => {
  const { title, status, message } = props;
  return (
    <Stack
      direction={"row"}
      spacing={1}
      sx={{
        p: 1,
        color: "#fff",
        ...(status === "success" && {
          backgroundColor: "green",
        }),
        ...(status === "pending" && {
          backgroundColor: "blue",
        }),
        ...(status === "error" && {
          backgroundColor: "red",
        }),
      }}
    >
      <Typography>{title}</Typography>
      <Typography>{message}</Typography>
    </Stack>
  );
};

export default Notification;
