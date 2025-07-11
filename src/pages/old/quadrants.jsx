import React from "react";
import { alpha, Box, Divider, Typography } from "@mui/material";
import { QUADRANTS } from "../../db/quadrants";

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
    labelPosition: { top: "50%", left: "87%" },
    listPosition: {
      top: "50%",
      left: "100%",
      transform: "translate3d(1%,108%,0) rotate(-90deg)",
      transformOrigin: "left top",
      width: 240,
      height: "auto",
      overflowY: "auto",
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
      overflowY: "auto",
    },
  },
  left: {
    clipPath: "polygon(0 0, 50% 50%, 0 100%)",
    labelPosition: {
      top: "50%",
      left: "15.5%",
      maxWidth: "60px",
      textWrap: "wrap",
    },
    listPosition: {
      top: "50%",
      right: "100%",
      transform: "translate3d(-48%, -108%, 0) rotate(-90deg)",
      transformOrigin: "right top",
      width: 240,
      height: "auto",
      overflowY: "auto",
    },
  },
};

const Quadrants = () => {
  const getQuadrantByPosition = (pos) =>
    QUADRANTS.quadrants.find((q) => q.defaultPostion === pos);

  const topQ = getQuadrantByPosition("top");
  const rightQ = getQuadrantByPosition("right");
  const bottomQ = getQuadrantByPosition("bottom");
  const leftQ = getQuadrantByPosition("left");

  const topCount = topQ?.rowItems?.length || 0;
  const rightCount = rightQ?.rowItems?.length || 0;
  const bottomCount = bottomQ?.rowItems?.length || 0;
  const leftCount = leftQ?.rowItems?.length || 0;

  const cellWidth = 30;
  const cellHeight = 30;

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 250,
          height: 250,
          border: "2px solid #ccc",
          borderRadius: "8px",
          overflow: "visible",
          boxShadow: 1,
        }}
      >
        {/* 🧭 Render All Quadrants */}
        {QUADRANTS.quadrants.map((quad, index) => {
          const position = quad.defaultPostion;
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
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
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
            </React.Fragment>
          );
        })}

        {/* 🔲 Top-Right Dynamic Table */}
        {topCount > 0 && rightCount > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: `-${rightCount * cellHeight + 5}px`,
              left: "100%",
              transform: "translateX(4px)",
              display: "grid",
              gridTemplateColumns: `repeat(${topCount}, ${cellWidth}px)`,
              gridTemplateRows: `repeat(${rightCount}, ${cellHeight}px)`,
            }}
          >
            {Array.from({ length: topCount * rightCount }).map((_, i) => (
              <Box
                key={i}
                sx={{
                  border: "0.5px dashed #ccc",
                }}
              />
            ))}
          </Box>
        )}

        {/* 🔲 Top-Left Dynamic Table */}
        {topCount > 0 && leftCount > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: `-${leftCount * cellHeight + 5}px`,
              right: "100%",
              transform: "translateX(-4px)",
              display: "grid",
              gridTemplateColumns: `repeat(${leftCount}, ${cellWidth}px)`,
              gridTemplateRows: `repeat(${topCount}, ${cellHeight}px)`,
            }}
          >
            {Array.from({ length: topCount * leftCount }).map((_, i) => (
              <Box
                key={i}
                sx={{
                  border: "0.5px dashed #ccc",
                }}
              />
            ))}
          </Box>
        )}

        {/* 🔲 Bottom-Left Dynamic Table */}
        {bottomCount > 0 && leftCount > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: "100%",
              right: "100%",
              transform: `translate(-4px, ${5}px)`,
              display: "grid",
              gridTemplateColumns: `repeat(${leftCount}, ${cellWidth}px)`,
              gridTemplateRows: `repeat(${bottomCount}, ${cellHeight}px)`,
            }}
          >
            {Array.from({ length: bottomCount * leftCount }).map((_, i) => (
              <Box
                key={i}
                sx={{
                  border: "0.5px dashed #ccc",
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Quadrants;
