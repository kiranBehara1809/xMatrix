// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
  },
  primary: {
    main: "#0171bb",
  },
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

    // ✅ Button overrides
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none", // Remove elevation shadow
          outline: "none", // Remove outline
          background : "#0171bb",
          "&:hover": {
            boxShadow: "none", // Prevent hover shadow
            outline: "none",
            border: "none",
          },
          "&:focus": {
            boxShadow: "none",
            outline: "none",
          },
        },
      },
      defaultProps: {
        disableElevation: true, // Disable elevation by default
        disableRipple: false, // Optional: disable ripple
        disableFocusRipple: true, // Disable focus ripple
      },
    },
  },
});

export default theme;
