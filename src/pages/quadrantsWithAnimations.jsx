import React, { useState } from "react";
import {
  alpha,
  Box,
  Button,
  Collapse,
  Divider,
  Fade,
  Typography,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import { QUADRANTS } from "../db/quadrants";

// 🔄 Rotation animations
const rotateAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(90deg); }
`;
const reverseRotateAnimation = keyframes`
  0% { transform: rotate(90deg); }
  100% { transform: rotate(0deg); }
`;

const triangleStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
};

const labelStyle = {
  position: "absolute",
  color: "#fff",
  fontSize: "12px",
  padding: "4px 8px",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  borderRadius: "6px",
  transform: "translate(-50%, -50%)",
};

const quadrantConfigs = {
  top: {
    clipPath: "polygon(0 0, 100% 0, 50% 50%)",
    labelPosition: { top: "10%", left: "50%" },
    listPosition: {
      bottom: "101%",
      left: "50%",
      transform: "translateX(-50%)",
      width: 240,
      maxHeight: 200,
      overflowY: "auto",
    },
  },
  right: {
    clipPath: "polygon(100% 0, 100% 100%, 50% 50%)",
    labelPosition: { top: "50%", left: "80%" },
    listPosition: {
      top: "50%",
      left: "100%",
      transform: "translate3d(1%,108%,0) rotate(-90deg)",
      transformOrigin: "left top",
      width: 240,
      height: "auto",
    },
  },
  bottom: {
    clipPath: "polygon(0 100%, 50% 50%, 100% 100%)",
    labelPosition: { top: "90.5%", left: "50%" },
    listPosition: {
      top: "101%",
      left: "50%",
      transform: "translateX(-50%)",
      width: 240,
      maxHeight: 200,
    },
  },
  left: {
    clipPath: "polygon(0 0, 50% 50%, 0 100%)",
    labelPosition: { top: "50%", left: "20%" },
    listPosition: {
      top: "50%",
      right: "100%",
      transform: "translate3d(-48%, -108%, 0) rotate(-90deg)",
      transformOrigin: "right top",
      width: 240,
      height: "auto",
    },
  },
};

const positionOrder = ["top", "right", "bottom", "left"];

const rotateQuadrants = (quads, rotationIndex) => {
  return quads.map((q) => {
    const currentIndex = positionOrder.indexOf(q.defaultPostion);
    const newIndex = (currentIndex + rotationIndex) % 4;
    return {
      ...q,
      rotatedPosition: positionOrder[newIndex],
    };
  });
};

const QuadrantsWithAnimations = () => {
  const [rotationIndex, setRotationIndex] = useState(0);
  const [rotating, setRotating] = useState(false);
  const [show, setShow] = useState(true);

  const cellWidth = 30;
  const cellHeight = 30;

  const rotatedQuads = rotateQuadrants(QUADRANTS.quadrants, rotationIndex);
  const quadrantMap = Object.fromEntries(
    rotatedQuads.map((q) => [q.rotatedPosition, q])
  );

  const handleAnimate = () => {
    setShow(false);
    setRotating(true);
    setTimeout(() => {
      setRotating(false);
      setRotationIndex((prev) => (prev + 1) % 4);
      setShow(true);
    }, 1000);
  };

  return (
    <>
      <Button variant="contained" onClick={handleAnimate} sx={{ mb: 3 }}>
        Rotate & Animate
      </Button>

      <Box
        sx={{
          position: "relative",
          width: 250,
          height: 250,
          margin: "auto",
          border: "2px solid #ccc",
          borderRadius: "8px",
          overflow: "visible",
          boxShadow: 1,
          animation: rotating
            ? `${rotateAnimation} 1s forwards`
            : `${reverseRotateAnimation} 1s forwards`,
        }}
      >
        {/* 🧭 Render Quadrants */}
        {rotatedQuads.map((quad, index) => {
          const position = quad.rotatedPosition;
          const config = quadrantConfigs[position];
          if (!config) return null;

          return (
            <React.Fragment key={index}>
              <Box
                sx={{
                  ...triangleStyle,
                  backgroundColor: alpha(quad.color, 0.7),
                  clipPath: config.clipPath,
                }}
              />
              <Typography
                sx={{
                  ...labelStyle,
                  ...config.labelPosition,
                  textAlign: "center",
                }}
              >
                {quad.quadrantName}
              </Typography>
              <Collapse in={show}>
                <Box
                  sx={{
                    position: "absolute",
                    ...config.listPosition,
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: 2,
                    boxShadow: 3,
                    padding: 1,
                    fontSize: "12px",
                    maxHeight: 200,
                    overflowY: "auto",
                    "&::-webkit-scrollbar": { display: "none" },
                  }}
                >
                  {quad.rowItems.map((item) => (
                    <React.Fragment key={item.rowId}>
                      <Typography
                        sx={{
                          color: "gray",
                          mb: 1,
                          fontSize: "11px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.rowName}
                      </Typography>
                      <Divider />
                    </React.Fragment>
                  ))}
                </Box>
              </Collapse>
            </React.Fragment>
          );
        })}

        {/* 🔲 Render Intersections from Mappings */}
        {Object.entries(QUADRANTS.mappings).map(([key, { rows, cols }], i) => {
          const rowQ = rotatedQuads.find((q) => q.defaultPostion === rows);
          const colQ = rotatedQuads.find((q) => q.defaultPostion === cols);

          if (!rowQ || !colQ) return null;

          const rowItems = rowQ.rowItems;
          const colItems = colQ.rowItems;

          const positionStyles = {
            "top-right": {
              top: `-${rowItems.length * cellHeight + 5}px`,
              left: "100%",
              transform: "translateX(4px)",
            },
            "top-left": {
              top: `-${colItems.length * cellHeight + 5}px`,
              right: "100%",
              transform: "translateX(-4px)",
            },
            "bottom-left": {
              top: "100%",
              right: "100%",
              transform: "translate(-4px, 5px)",
            },
          };

          const pos = positionStyles[key];

          return (
            <Fade in={show} timeout={400} key={i}>
              <Box
                sx={{
                  position: "absolute",
                  display: "grid",
                  gridTemplateColumns: `repeat(${colItems.length}, ${cellWidth}px)`,
                  gridTemplateRows: `repeat(${rowItems.length}, ${cellHeight}px)`,
                  ...pos,
                }}
              >
                {rowItems.map((rowItem, rowIdx) =>
                  colItems.map((colItem, colIdx) => (
                    <Box
                      key={`${rowItem.rowId}-${colItem.rowId}`}
                      sx={{
                        border: "0.5px dashed #ccc",
                        width: cellWidth,
                        height: cellHeight,
                        fontSize: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: alpha("#000", 0.03),
                      }}
                      title={`${rowItem.rowName} × ${colItem.rowName}`}
                    >
                      j
                    </Box>
                  ))
                )}
              </Box>
            </Fade>
          );
        })}
      </Box>
    </>
  );
};

export default QuadrantsWithAnimations;
