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
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="caption" color="inherit" sx={{ pt: 0.5 }}>
          © {new Date().getFullYear()} Powered by X-Matrix
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
