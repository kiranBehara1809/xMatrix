import React, { useEffect, useState } from "react";
import { Box, keyframes } from "@mui/material";

// Slide in from top
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Slide up and fade out
const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const Pill = ({
  label,
  color = "#1976d2",
  textColor = "#fff",
  showDuration = 3000, // time to stay visible (ms)
}) => {
  const [visible, setVisible] = useState(true); // for exit animation
  const [remove, setRemove] = useState(false); // actually remove from DOM if needed

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, showDuration);

    const removeTimer = setTimeout(() => {
      setRemove(true);
    }, showDuration + 40); // wait for exit animation to finish

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [showDuration]);

  if (remove) return null;

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "30px",
          left: "40%",
          right: "50%",
          animation: `${visible ? slideIn : slideOut} 0.4s ease`,
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        <Box
          sx={{
            display: "block",
            width: "auto",
            minWidth: "150px",
            p: "10px 10px",
            backgroundColor: color,
            color: textColor,
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </Box>
      </Box>
    </>
  );
};

export default Pill;
