import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Timeline } from "@mui/icons-material";
import { LineChart } from "@mui/x-charts/LineChart";
import { SparkLineChart } from "@mui/x-charts";

const Widget = ({ title, value, changePercent, changeValue, chartData }) => {
  return (
    <Card
      sx={{
        minWidth: 200,
        textAlign: "center",
        borderRadius: "16px",
      }}
    >
      <CardContent>
        <Typography variant="subtitle1" color="text.secondary">
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            color={+changePercent < 2.3 ? "error" : "success"}
          >
            {+changePercent < 2.3 ? "▼" : "▲"} {changePercent}%
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            {changeValue}
          </Typography>
        </Box>
        <Box sx={{ height: 50, position: "relative" }}>
          <SparkLineChart
            data={Array.from({ length: 8 }, () =>
              Math.floor(Math.random() * 10)
            )}
            color={+changePercent < 2.3 ? "red" : "green"}
            height={50}
            width={170}
          />
        </Box>
        <Typography
          sx={{ mt: 1, mb: "-16px", fontWeight: "bold", fontSize: "1.2rem" }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Widget;
