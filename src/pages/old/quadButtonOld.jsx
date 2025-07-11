import React, { use, useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Button, Tooltip } from "@mui/material";
import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";

const QuadrantButtonsOld = ({ emitSelectedRotation = () => {}, show }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const indexes = [0, 1, 2, 3];
  const forwardClick = () => {
    setSelectedIndex((prev) => {
      const currentIndex = indexes.findIndex((index) => index === prev);
      if (currentIndex === 3) {
        return 0;
      }
      const nextIndex = currentIndex + 1;
      return nextIndex;
    });
  };
  const backwardClick = () => {
    setSelectedIndex((prev) => {
      const currentIndex = indexes.findIndex((index) => index === prev);
      if (currentIndex === 0) {
        return 3;
      }
      const nextIndex = currentIndex - 1;
      return nextIndex;
    });
  };

  useEffect(() => {
    emitSelectedRotation(selectedIndex);
  }, [selectedIndex]);

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
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    padding: "20px",
    position: "absolute",
    bottom: "10px",
    right: "10px",
    borderRadius: "12px",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
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
    <>
      <div style={containerStyle}>
        <span
          style={{
            fontSize: "13px",
            color: "#000",
            whiteSpace: "break-spaces",
            width: "120px",
          }}
        >
          Change orientation
        </span>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "5px",
            p: 1,
            borderRadius: "8px",
          }}
        >
          <Tooltip
            title="Rotate Left (Anti-clockwise)"
            placement="bottom"
            arrow
          >
            <Button
              disabled={!show}
              variant="contained"
              onClick={() => backwardClick()}
            >
              <UndoIcon />
            </Button>
          </Tooltip>

          <Tooltip title="Rotate Right (Clockwise)" placement="bottom" arrow>
            <Button
              disabled={!show}
              variant="contained"
              onClick={() => forwardClick()}
            >
              <RedoIcon />
            </Button>
          </Tooltip>
        </Box>

        {/* {quadrantColors.map((colors, index) => {
          const isSelected = selectedIndex === index;
          const buttonStyle = {
            ...baseButtonStyle,
            boxShadow: isSelected ? "0 0 0 3px #000 inset" : "none",
            transform: isSelected ? "scale(1.5)" : "scale(0.8)",
          };

          return (
            <>
              <div
                key={index}
                style={buttonStyle}
                onClick={() => {
                  emitSelectedRotation(index);
                  setSelectedIndex(index);
                }}
              >
                Top triangle
                <div
                  style={{
                    ...triangleStyle,
                    backgroundColor: colors.top,
                    clipPath: "polygon(0% 0%, 100% 0%, 50% 50%)",
                  }}
                />
                Right triangle
                <div
                  style={{
                    ...triangleStyle,
                    backgroundColor: colors.right,
                    clipPath: "polygon(100% 0%, 100% 100%, 50% 50%)",
                  }}
                />
                Bottom triangle
                <div
                  style={{
                    ...triangleStyle,
                    backgroundColor: colors.bottom,
                    clipPath: "polygon(100% 100%, 0% 100%, 50% 50%)",
                  }}
                />
                Left triangle
                <div
                  style={{
                    ...triangleStyle,
                    backgroundColor: colors.left,
                    clipPath: "polygon(0% 100%, 0% 0%, 50% 50%)",
                  }}
                />
              </div>
            </>
          );
        })} */}
      </div>
    </>
  );
};

export default QuadrantButtonsOld;
