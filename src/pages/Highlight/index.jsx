import { Box, Grid } from "@mui/material";
import React from "react";
import Header from "./Header";
import SearchBar from "./Search";
import { DRILL_DOWN_VIEW } from "../../db/drilldownJSON";
import Widget from "./Widgets";
import MarketSummary from "./Summary";
import Watchlist from "./Watchlist";
import { AutoGraph } from "@mui/icons-material";
import Performers from "./Performers";

const HighlightModal = ({ rowId }) => {
  return (
    <>
      <Grid container spacing={1} sx={{ width: "100%" }}>
        <Grid item size={8}>
          <Header icon={<AutoGraph fontSize="small" />} title="Finance" />
          <SearchBar />
          <Box
            sx={{
              p: 1,
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
              justifyContent: "center",
            }}
          >
            {DRILL_DOWN_VIEW?.futures?.map((x) => (
              <Widget {...x} />
            ))}
          </Box>
          <MarketSummary />
        </Grid>
        <Grid item size={4}>
          <Watchlist />
          <Performers />
        </Grid>
      </Grid>
    </>
  );
};

export default HighlightModal;
