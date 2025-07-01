// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          padding: 0,
          minHeight: "32px",
          "&.Mui-expanded": {
            margin: 0,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: "32px",
          "&.Mui-expanded": {
            minHeight: "32px",
          },
        },
        content: {
          margin: "4px 0",
          "&.Mui-expanded": {
            margin: "4px 0",
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "8px 16px",
        },
      },
    },
  },
});

export default theme;
