import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const QuadrantButtons = ({ emitSelectedRotation = () => {} }) => {
  const [selectedIndex, setSelectedIndex] = useState(0); // Track selected button

  const quadrantColors = [
    {
      top: "#2979ff",
      right: "#ff9100",
      bottom: "#ff1744",
      left: "#00e676",
    },
    {
      top: "#00e676",
      right: "#2979ff",
      bottom: "#ff9100",
      left: "#ff1744",
    },
    {
      top: "#ff1744",
      right: "#00e676",
      bottom: "#2979ff",
      left: "#ff9100",
    },
    {
      top: "#ff9100",
      right: "#ff1744",
      bottom: "#00e676",
      left: "#2979ff",
    },
  ];

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    padding: "20px",
    position: "absolute",
    bottom: "10px",
    right: "10px",
  };

  const baseButtonStyle = {
    position: "relative",
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "box-shadow 0.2s ease",
  };

  const triangleStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
  };

  return (
    <div style={containerStyle}>
      {quadrantColors.map((colors, index) => {
        const isSelected = selectedIndex === index;
        const buttonStyle = {
          ...baseButtonStyle,
          boxShadow: isSelected ? "0 0 0 3px #000 inset" : "none",
          transform: isSelected ? "scale(1.5)" : "scale(1)",
        };

        return (
          <div
            key={index}
            style={buttonStyle}
            onClick={() => {
              emitSelectedRotation(index);
              setSelectedIndex(index);
            }}
          >
            {/* Top triangle */}
            <div
              style={{
                ...triangleStyle,
                backgroundColor: colors.top,
                clipPath: "polygon(0% 0%, 100% 0%, 50% 50%)",
              }}
            />
            {/* Right triangle */}
            <div
              style={{
                ...triangleStyle,
                backgroundColor: colors.right,
                clipPath: "polygon(100% 0%, 100% 100%, 50% 50%)",
              }}
            />
            {/* Bottom triangle */}
            <div
              style={{
                ...triangleStyle,
                backgroundColor: colors.bottom,
                clipPath: "polygon(100% 100%, 0% 100%, 50% 50%)",
              }}
            />
            {/* Left triangle */}
            <div
              style={{
                ...triangleStyle,
                backgroundColor: colors.left,
                clipPath: "polygon(0% 100%, 0% 0%, 50% 50%)",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default QuadrantButtons;
