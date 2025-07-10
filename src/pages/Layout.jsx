import React from "react";
import Header from "./header";
import { Box } from "@mui/material";
import TriangleBox from "./ReworkOfQuadrants";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <Box sx={{ height: "calc(100dvh - 40px)", overflow: "auto" }}>
        <TriangleBox />
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
