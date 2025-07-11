import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const Footer = () => {
  return (
    <AppBar
      position="static"
      component="footer"
      color="inherit"
      sx={{
        position: "absolute",
        top: "auto",
        bottom: 0,
        width: "100%",
        mt: "auto",
        height: "25px",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="caption" color="inherit" sx={{ pt: 0.5 }}>
          {new Date().getFullYear()} - {new Date().getFullYear() + 1} | © to &
          Powered by <strong>X-Matrix</strong>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
