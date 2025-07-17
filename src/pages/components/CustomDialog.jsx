import React from "react";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import { Box, Fade, Typography } from "@mui/material";

const CustomDialog = ({
  onClose,
  open,
  children,
  title = "Custom Dialog",
  maxWidth = "lg",
  sx = {},
  icon = null,
}) => {
  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      slots={{
        transition: Fade, // ✅ replaces deprecated TransitionComponent
      }}
      slotProps={{
        transition: {
          timeout: {
            enter: 1000, // smooth fade-in
            exit: 500, // smooth fade-out
          },
        },
      }}
      fullWidth
      onClose={handleClose}
      open={open}
      // sx={{ zIndex: 10000000001, ...sx }}
      sx={{
        ...sx,
        "& .MuiDialog-paper": {
          zIndex: 100000000000, // Lower than Select's MenuProps z-index
        },
      }}
      maxWidth={maxWidth}
    >
      {icon === null && (
        <DialogTitle
          sx={{ textAlign: "center", lineHeight: "0.6", maxHeight: "20px" }}
        >
          {title}
        </DialogTitle>
      )}
      {icon !== null && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>{icon}</Box>
      )}
      {children}
    </Dialog>
  );
};

export default CustomDialog;

CustomDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
