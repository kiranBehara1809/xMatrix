import { Avatar, Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import Header from "./Header";
import {
  Add,
  Apple,
  Diamond,
  Facebook,
  Google,
  IncompleteCircle,
  Microsoft,
  Tune,
} from "@mui/icons-material";

const Performers = () => {
  return (
    <Box sx={{ mt: 1 }}>
      <Header icon={null} title="Gainers" showChip={false} endElement={null} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          p: 1,
          borderRadius: 1,
          mt: 0.5,
          background: "#d3d3d357",
        }}
      >
        <Grid
          container
          spacing={1}
          sx={{ minHeight: 20, display: "flex", alignItems: "center" }}
        >
          <Grid size={1}>
            <IncompleteCircle />
          </Grid>
          <Grid size={9}>
            <Typography variant="body2">Cyclacel Pharmaceuticals</Typography>
            <Typography sx={{ fontSize: "11px" }}>CYCC</Typography>
          </Grid>
          <Grid size={2}>
            <Typography variant="body2">$10.67</Typography>
            <Typography variant="body2" sx={{  color: "indigo" }}>
              + 173%
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 1 }} />

        <Grid
          container
          spacing={1}
          sx={{ minHeight: 20, display: "flex", alignItems: "center" }}
        >
          <Grid size={1}>
            <Avatar sx={{ height: 24, width: 24 }} variant="rounded">
              X
            </Avatar>
          </Grid>
          <Grid size={9}>
            <Typography variant="body2">
              Longetivity Health Holdings Inc...
            </Typography>
            <Typography sx={{ fontSize: "11px" }}>XAGE</Typography>
          </Grid>
          <Grid size={2}>
            <Typography variant="body2">$5.70</Typography>
            <Typography variant="body2" sx={{  color: "indigo" }}>
              + 116%
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 1 }} />

        <Grid
          container
          spacing={1}
          sx={{ minHeight: 15, display: "flex", alignItems: "center" }}
        >
          <Grid size={1}>
            <Avatar sx={{ height: 24, width: 24 }} variant="rounded">
              K
            </Avatar>
          </Grid>
          <Grid size={9}>
            <Typography variant="body2">Kairos Pharma Ltd</Typography>
            <Typography sx={{ fontSize: "11px" }}>KAPA</Typography>
          </Grid>
          <Grid size={2}>
            <Typography variant="body2">$1.67</Typography>
            <Typography variant="body2" sx={{  color: "indigo" }}>
              + 70%
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 1 }} />

        <Grid
          container
          spacing={1}
          sx={{ minHeight: 20, display: "flex", alignItems: "center" }}
        >
          <Grid size={1}>
            <Avatar sx={{ height: 24, width: 24 }} variant="rounded">
              T
            </Avatar>
          </Grid>
          <Grid size={9}>
            <Typography variant="body2">
              Trident Digital Tech Holding...
            </Typography>
            <Typography sx={{ fontSize: "11px" }}>TDTH</Typography>
          </Grid>
          <Grid size={2}>
            <Typography variant="body2">$0.17</Typography>
            <Typography variant="body2" sx={{ color: "indigo" }}>
              + 168%
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Performers;
