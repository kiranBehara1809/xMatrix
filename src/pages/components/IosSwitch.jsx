// import React from "react";
// import { styled } from "@mui/material/styles";
// import Switch from "@mui/material/Switch";
// import FormControlLabel from "@mui/material/FormControlLabel";

// const IOSSwitch = styled((props) => (
//   <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
// ))(({ theme }) => ({
//   width: 42,
//   height: 26,
//   padding: 0,
//   display: "flex",
//   "&:active .MuiSwitch-thumb": {
//     width: 22,
//   },
//   "& .MuiSwitch-switchBase": {
//     padding: 2,
//     "&.Mui-checked": {
//       transform: "translateX(16px)",
//       color: "#fff",
//       "& + .MuiSwitch-track": {
//         backgroundColor: theme.palette.mode === "dark" ? "#65C466" : "#4cd964",
//         opacity: 1,
//         border: 0,
//       },
//     },
//   },
//   "& .MuiSwitch-thumb": {
//     boxShadow: "0 2px 4px 0 rgb(0 0 0 / 20%)",
//     width: 22,
//     height: 22,
//     borderRadius: 11,
//     transition: theme.transitions.create(["width"], {
//       duration: 200,
//     }),
//   },
//   "& .MuiSwitch-track": {
//     borderRadius: 26 / 2,
//     opacity: 1,
//     backgroundColor: theme.palette.mode === "dark" ? "#39393D" : "#E9E9EA",
//     boxSizing: "border-box",
//   },
// }));

// export default function IosSwitchDemo({ label = "" }) {
//   const [checked, setChecked] = React.useState(true);

//   const handleChange = (event) => {
//     setChecked(event.target.checked);
//   };

//   return (
//     <FormControlLabel
//       sx={{ fontSize: "12px" }}
//       control={
//         <IOSSwitch checked={checked} onChange={handleChange} name="ios-style" />
//       }
//       label={label === "" ? (checked ? "Turned On" : "Turned Off") : label}
//     />
//   );
// }

import React from "react";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 80,
  height: 36,
  padding: 0,
  marginLeft: "16px",
  display: "flex",
  "& .MuiSwitch-switchBase": {
    padding: 4,
    "&.Mui-checked": {
      transform: "translateX(44px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#65C466" : "#4cd964",
        opacity: 1,
        border: 0,
      },
      "& .MuiSwitch-thumb:after": {
        content: '"✓"', // Icon or text for checked state
        color: "#000",
      },
    },
    "& .MuiSwitch-thumb:after": {
      content: '"✕"', // Icon or text for unchecked state
      color: "#000",
    },
  },
  "& .MuiSwitch-thumb": {
    position: "relative",
    boxShadow: "0 2px 4px 0 rgb(0 0 0 / 20%)",
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#fff",
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
    "&:after": {
      content: '""', // Will be overwritten by above rules
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: "16px",
      fontWeight: "bold",
    },
  },
  "& .MuiSwitch-track": {
    borderRadius: 36 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#39393D" : "#E9E9EA",
    boxSizing: "border-box",
  },
}));

export default function IosSwitchDemo({ label = "" }) {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <IOSSwitch checked={checked} onChange={handleChange} name="ios-style" />
      }
      label={""}
    />
  );
}
