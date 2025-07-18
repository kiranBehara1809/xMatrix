import { AutoGraph } from "@mui/icons-material";
import { Box, Chip, Typography } from "@mui/material";
import React, { useState } from "react";

const ACTIVE_CHIP_COLOR = "#1565c0";

const Header = ({
  icon = null,
  title = "",
  showChip = true,
  endElement = null,
}) => {
  const [clickedChip, setClickedChip] = useState(null);

  const getChipStyles = (chipLabel) => ({
    size: "small",
    variant: "outlined",
    sx: {
      backgroundColor:
        clickedChip === chipLabel ? "primary.main" : "transparent",
      color: clickedChip === chipLabel ? "primary.contrastText" : "inherit",
      borderColor: clickedChip === chipLabel ? "primary.main" : "grey.400",
      "&:hover": {
        backgroundColor:
          clickedChip === chipLabel
            ? `${ACTIVE_CHIP_COLOR} !important`
            : "grey.100",
        borderColor: clickedChip === chipLabel ? "primary.main" : "grey.400",
        color:
          clickedChip === chipLabel ? "primary.contrastText" : "text.primary",
      },
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 1,
        borderRadius: 2,
        gap: 1.25,
        boxShadow: 1,
        bgcolor: "background.paper",
      }}
    >
      <Typography
        variant="body1"
        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
      >
        <AutoGraph fontSize="small" />
        {title}
      </Typography>
      {showChip && (
        <Box sx={{ display: "flex", gap: 1 }}>
          {["US Markets", "Crypto", "Earnings"].map((label) => (
            <Chip
              key={label}
              label={label}
              onClick={() => setClickedChip(label)}
              {...getChipStyles(label)}
            />
          ))}
        </Box>
      )}
      {endElement !== null && endElement}
    </Box>
  );
};

export default Header;
