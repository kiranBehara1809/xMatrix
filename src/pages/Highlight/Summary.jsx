import React from "react";
import { Typography, Box, Divider } from "@mui/material";
import { DRILL_DOWN_VIEW } from "../../db/drilldownJSON";

const MarketSummary = () => {
  return (
    <Box sx={{ maxWidth: "90%", margin: "auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 1,
        }}
      >
        <Typography variant="body1" gutterBottom>
          Market Summary
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Updated 30 minutes ago
        </Typography>
      </Box>
      <Divider sx={{ my: 1 }} />
      {DRILL_DOWN_VIEW.marketSummary.map((item, index) => (
        <Box key={index} sx={{ mb: 1 }}>
          <Typography variant="body2" color="text.primary">
            {item.title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {item.content}
          </Typography>
          <Divider sx={{ my: 1 }} />
        </Box>
      ))}
    </Box>
  );
};

export default MarketSummary;
