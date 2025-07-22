import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import gmLogo from "../assets/gmlogo.png";

const Header = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  const logouthandler = () => {
    localStorage.removeItem("userName");
    navigate("/login");
  };
  return (
    <AppBar
      position="static"
      sx={{ width: "100%", overflow: "hidden", background: "#0171bb" }}
    >
      <Toolbar variant="dense">
        <img src={gmLogo} width={60} height={40} style={{marginLeft : "-8px"}} />
        {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          X-Matrix
        </Typography> */}
        <span style={{flex: 1}}></span>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Button
            color="primary"
            size="small"
            variant="contained"
            sx={{ textTransform: "capitalize", ml: 3 }}
          >
            <Avatar
              sx={{ width: 25, height: 25, bgcolor: "#96c3f0d6" }}
              variant="rounded"
            >
              {userName?.split("")[0].toUpperCase()}
            </Avatar>
            <Typography
              sx={{
                marginLeft: "8px",
                fontSize: "14px",
                color: "#fff",
              }}
            >
              {userName
                ?.toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </Typography>
          </Button>

          <Button
            color="primary"
            size="small"
            variant="contained"
            sx={{ textTransform: "capitalize", ml: 1 }}
            onClick={logouthandler}
          >
            <LogoutIcon sx={{ height: 18, width: 18, pr: 1 }} />
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
