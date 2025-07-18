import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import Header from "./Header";
import {
  Add,
  Apple,
  Diamond,
  Facebook,
  Google,
  Microsoft,
  Tune,
} from "@mui/icons-material";

const Watchlist = () => {
  return (
    <>
      <Header
        icon={<Add fontSize="small" />}
        title="Create Watchlist"
        showChip={false}
        endElement={<Tune fontSize="small" />}
      />
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
            <Apple />
          </Grid>
          <Grid size={8}>
            <Typography variant="body2">Apple Inc.</Typography>
            <Typography sx={{ fontSize: "11px" }}>Apple Inc.</Typography>
          </Grid>
          <Grid size={2}>
            <Typography variant="body2">$170.67</Typography>
            <Typography variant="body2" sx={{ pl: 1, color: "indigo" }}>
              12.12%
            </Typography>
          </Grid>
          <Grid size={1}>+</Grid>
        </Grid>
        <Divider sx={{ my: 1 }} />

        <Grid
          container
          spacing={1}
          sx={{ minHeight: 20, display: "flex", alignItems: "center" }}
        >
          <Grid size={1}>
            <Google />
          </Grid>
          <Grid size={8}>
            <Typography variant="body2">Alphabet Inc.</Typography>
            <Typography sx={{ fontSize: "11px" }}>Apple Inc.</Typography>
          </Grid>
          <Grid size={2}>
            <Typography variant="body2">$230.67</Typography>
            <Typography variant="body2" sx={{ pl: 1, color: "indigo" }}>
              82.12%
            </Typography>
          </Grid>
          <Grid size={1}>+</Grid>
        </Grid>
        <Divider sx={{ my: 1 }} />

        <Grid
          container
          spacing={1}
          sx={{ minHeight: 15, display: "flex", alignItems: "center" }}
        >
          <Grid size={1}>
            <Diamond />
          </Grid>
          <Grid size={8}>
            <Typography variant="body2">Diamond Inc.</Typography>
            <Typography sx={{ fontSize: "11px" }}>Diamond</Typography>
          </Grid>
          <Grid size={2}>
            <Typography variant="body2">$90.67</Typography>
            <Typography variant="body2" sx={{ pl: 1, color: "indigo" }}>
              0.12%
            </Typography>
          </Grid>
          <Grid size={1}>+</Grid>
        </Grid>
        <Divider sx={{ my: 1 }} />

        <Grid
          container
          spacing={1}
          sx={{ minHeight: 20, display: "flex", alignItems: "center" }}
        >
          <Grid size={1}>
            <Facebook />
          </Grid>
          <Grid size={8}>
            <Typography variant="body2">Facebook</Typography>
            <Typography sx={{ fontSize: "11px" }}>Meta</Typography>
          </Grid>
          <Grid size={2}>
            <Typography variant="body2">$190.67</Typography>
            <Typography variant="body2" sx={{ pl: 1, color: "indigo" }}>
              8.12%
            </Typography>
          </Grid>
          <Grid size={1}>+</Grid>
        </Grid>
        <Divider sx={{ my: 1 }} />

        <Grid
          container
          spacing={1}
          sx={{ minHeight: 20, display: "flex", alignItems: "center" }}
        >
          <Grid size={1}>
            <Microsoft />
          </Grid>
          <Grid size={8}>
            <Typography variant="body2">Microsoft</Typography>
            <Typography sx={{ fontSize: "11px" }}>Microsoft</Typography>
          </Grid>
          <Grid size={2}>
            <Typography variant="body2">$290.67</Typography>
            <Typography variant="body2" sx={{ pl: 1, color: "indigo" }}>
              1.12%
            </Typography>
          </Grid>
          <Grid size={1}>+</Grid>
        </Grid>
      </Box>
    </>
  );
};
{
  /* <Microsoft />
            <Google />
            <Facebook />
            <Diamond /> */
}

export default Watchlist;
