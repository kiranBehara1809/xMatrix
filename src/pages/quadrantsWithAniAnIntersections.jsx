import React, { useEffect, useState } from "react";
import {
  alpha,
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Fade,
  Popover,
  Typography,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import { QUADRANTS } from "../db/quadrants";
import CircleIcon from "@mui/icons-material/Circle";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import QuadrantButtons from "./quadrantButtons";

const VerticalDivider = () => (
  <div
    style={{
      width: "1px",
      backgroundColor: "#000",
      height: "100%",
      margin: "0 20px",
    }}
  />
);

const UserDetails = () => {
  const userName = localStorage.getItem("userName");
  return (
    <Box
      sx={{
        position: "absolute",
        top: "10px",
        right: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "auto",
        height: "20px",
        borderRadius: "8px",
        padding: "8px 12px",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
      }}
    >
      <Avatar
        sx={{ width: 25, height: 25, backgroundColor: "#1976d2" }}
        variant="rounded"
      >
        {userName?.split("")[0].toUpperCase()}
      </Avatar>
      <Typography
        sx={{
          marginLeft: "8px",
          fontSize: "14px",
          color: "#000",
          fontWeight: "bold",
        }}
      >
        {userName
          ?.toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </Typography>
      <VerticalDivider />
      <Typography
        sx={{
          fontSize: "14px",
          color: "#000",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => {
          localStorage.removeItem("userName");
          window.location.href = "/login";
        }}
      >
        Logout
      </Typography>
    </Box>
  );
};
const ProjectHeader = () => {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "10px",
          left: "10px",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#000",
          padding: "10px 16px",
          borderRadius: "8px",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
        }}
      >
        X-Matrix
      </Box>
    </>
  );
};

const LegendComponent = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "10px",
        left: "10px",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
        borderRadius: "8px",
        padding: "10px 16px 16px 16px",
      }}
    >
      <span
        style={{
          textAlign: "start",
          fontSize: "13px",
          color: "#000",
        }}
      >
        Keys
      </span>
      {Object.entries(MAPPING)?.map(([key, value], index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "4px",
          }}
        >
          <span style={{ paddingRight: "8px", fontSize: "16px" }}>
            {value.icon}
          </span>
          <span style={{ textAlign: "start", fontSize: "12px", color: "#000" }}>
            {value.label}
          </span>
        </Box>
      ))}
    </Box>
  );
};

const MAPPING = {
  RL: {
    label: "Relationship",
    icon: (
      <CircleIcon
        fontSize="small"
        style={{ fontSize: "10px", color: "#000" }}
      />
    ),
  },
  PR: {
    label: "Primary Responsibility",
    icon: (
      <PanoramaFishEyeIcon
        fontSize="small"
        style={{ fontSize: "10px", color: "#000" }}
      />
    ),
  }, // PRIMARY RESPONSIBILITY
  SR: {
    label: "Secondary Responsibility",
    icon: (
      <CircleIcon
        fontSize="small"
        style={{ fontSize: "10px", color: "darkgray" }}
      />
    ),
  }, // SECONDARY RESPONSIBILITY
};

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

const positionOrder = ["top", "right", "bottom", "left"];

const QuadrantsWithAniAnIntersections = () => {
  const [rotationIndex, setRotationIndex] = useState(0);
  const [show, setShow] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [initialRotation, setInitialRotation] = useState(0);
  const [showEverything, setShowEverything] = useState(true);
  const [rotatedQuads, setRotatedQuads] = useState([]);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("userName");
    if (!userLoggedIn) {
      setShowEverything(false);
      window.location.href = "/login";
    }
  }, []);

  const cellWidth = 24;
  const cellHeight = 24;
  const quadrantsForThisComponent = JSON.parse(
    JSON.stringify(QUADRANTS.quadrants)
  );

  useEffect(() => {
    setRotatedQuads(rotateQuadrants(quadrantsForThisComponent, rotationIndex));
  }, [initialRotation]);
  //   const rotatedQuads = rotateQuadrants(
  //     quadrantsForThisComponent,
  //     rotationIndex
  //   );

  const quadrantMap = Object.fromEntries(
    rotatedQuads.map((q) => [q.rotatedPosition, q])
  );

  const getUpdatedPosition = (quadrantObj) => {
    console.log(quadrantObj.defaultPostion, initialRotation);
    if (quadrantObj.defaultPostion === "top" && initialRotation === 0) {
      return "top";
    }
    if (quadrantObj.defaultPostion === "top" && initialRotation === 90) {
      return "right";
    }
    if (quadrantObj.defaultPostion === "top" && initialRotation === 180) {
      return "bottom";
    }
    if (quadrantObj.defaultPostion === "top" && initialRotation === 270) {
      return "left";
    }
    // ---
    if (quadrantObj.defaultPostion === "right" && initialRotation === 0) {
      return "right";
    }
    if (quadrantObj.defaultPostion === "right" && initialRotation === 90) {
      return "bottom";
    }
    if (quadrantObj.defaultPostion === "right" && initialRotation === 180) {
      return "left";
    }
    if (quadrantObj.defaultPostion === "right" && initialRotation === 270) {
      return "top";
    }
    // ---
    if (quadrantObj.defaultPostion === "bottom" && initialRotation === 0) {
      return "bottom";
    }
    if (quadrantObj.defaultPostion === "bottom" && initialRotation === 90) {
      return "left";
    }
    if (quadrantObj.defaultPostion === "bottom" && initialRotation === 180) {
      return "top";
    }
    if (quadrantObj.defaultPostion === "bottom" && initialRotation === 270) {
      return "right";
    }
    // ---
    if (quadrantObj.defaultPostion === "left" && initialRotation === 0) {
      return "left";
    }
    if (quadrantObj.defaultPostion === "left" && initialRotation === 90) {
      return "top";
    }
    if (quadrantObj.defaultPostion === "left" && initialRotation === 180) {
      return "right";
    }
    if (quadrantObj.defaultPostion === "left" && initialRotation === 270) {
      return "bottom";
    }
    return quadrantObj.defaultPostion;
  };

  const rotateQuadrants = (quads, rotationIndex) => {
    let a = quads.map((q) => {
      const currentIndex = positionOrder.indexOf(q.defaultPostion);
      const newIndex = (currentIndex + rotationIndex) % 4;
      return {
        ...q,
        rotatedPosition: positionOrder[newIndex],
        updatedPosition: getUpdatedPosition(q),
      };
    });
    console.log("rotateQuadrants", a);
    return a;
  };

  const quadrantConfigs = {
    top: {
      clipPath: "polygon(0 0, 100% 0, 50% 50%)",
      labelPosition: { top: "20%", left: "50%" },
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
        transform: "translate3d(1%,48%,0) rotate(-90deg)",
        transformOrigin: "left top",
        width: 240,
        height: "auto",
      },
    },
    bottom: {
      clipPath: "polygon(0 100%, 50% 50%, 100% 100%)",
      labelPosition: { top: "80%", left: "50%" },
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
        transform: "translate3d(-55%, -95%, 0) rotate(-90deg)",
        transformOrigin: "right top",
        width: 240,
        height: "auto",
      },
    },
  };

  const handleRotation = (index) => {
    setShow(false);
    switch (index) {
      case 0:
        setInitialRotation(0);
        break;
      case 1:
        setInitialRotation(90);
        break;
      case 2:
        setInitialRotation(180);
        break;
      case 3:
        setInitialRotation(270);
        break;
      default:
        setInitialRotation(0);
        break;
    }
    setTimeout(() => {
      setShow(true);
    }, 1000);
  };

  const getIntersectionValue = (rowItem, colItem) => {
    if (!rowItem || !colItem) return null;
    const rowId = rowItem.rowId;
    const colId = colItem.rowId;
    const intersections = rowItem.intersections || [];
    const colIntersections = colItem.intersections || [];
    const intersectionObj =
      intersections.find((x) => x.rowId === colId) ||
      colIntersections.find((x) => x.rowId === rowId);
    return MAPPING[intersectionObj?.type]?.icon || "";
  };

  const intersectionPairs = [
    {
      row: "top",
      col: "right",
      style: {
        top: `-${(quadrantMap.top?.rowItems?.length ?? 0) * cellHeight + 5}px`,
        left: "100%",
        transform: "translateX(4px)",
      },
    },
    {
      row: "top",
      col: "left",
      style: {
        top: `-${(quadrantMap.left?.rowItems?.length ?? 0) * cellHeight + 5}px`,
        right: "100%",
        transform: "translateX(-4px)",
      },
    },
    {
      row: "bottom",
      col: "left",
      style: {
        top: "100%",
        right: "100%",
        transform: "translate(-4px, 5px)",
      },
    },
  ];

  const getRowNameStyle = (quadrantObj) => {
    const STYLEOBJ = {
      "top-top": "rotate(0deg)",
      "top-right": "rotate(180deg)",
      "top-bottom": "rotate(180deg)",
      "top-left": "rotate(0deg)",

      "right-top": "rotate(180deg)",
      "right-right": "rotate(0deg)",
      "right-bottom": "rotate(0deg)",
      "right-left": "rotate(180deg)",

      "bottom-top": "rotate(180deg)",
      "bottom-right": "rotate(0deg)",
      "bottom-bottom": "rotate(0deg)",
      "bottom-left": "rotate(180deg)",

      "left-top": "rotate(360deg)",
      "left-right": "rotate(180deg)",
      "left-bottom": "rotate(180deg)",
      "left-left": "rotate(0deg)",
    };
    const dynamicKey = `${quadrantObj.defaultPostion}-${quadrantObj.updatedPosition}`;
    return STYLEOBJ[dynamicKey] || "rotate(0deg)";
  };

  if (!showEverything) {
    return null;
  }

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <UserDetails />
        <ProjectHeader />
        <QuadrantButtons emitSelectedRotation={handleRotation} />
        <LegendComponent />
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
            transform: `rotate(${initialRotation}deg)`,
            transition: "transform 1.5s ease-in-out",
            //   animation: rotating
            //     ? `${rotateAnimation} 1s forwards`
            //     : `${reverseRotateAnimation} 1s forwards`,
          }}
        >
          {/* 🧭 Render Quadrants */}
          {rotatedQuads.map((quad, index) => {
            const position = quad.rotatedPosition;
            const updatedPosition = quad.updatedPosition;
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
                    p: 0.5,
                    maxWidth: "75px",
                    transform: `translate(-50%, -50%) rotate(${-initialRotation}deg)`,
                    transition: "transform 1.5s ease-in-out",
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
                      fontSize: "12px",
                      "&::-webkit-scrollbar": { display: "none" },
                    }}
                  >
                    {quad.rowItems.map((item) => (
                      <React.Fragment key={item.rowId}>
                        <Typography
                          sx={{
                            color: "#000",
                            fontSize: "11px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            padding: "3px",
                            minHeight: "18px",
                            maxHeight: "18px",
                            transform: getRowNameStyle(quad),
                            ...item.styles,
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

          {/* 🔲 Intersection Grids (No mappings used!) */}
          {intersectionPairs.map(({ row, col, style }, i) => {
            const rowQ = quadrantMap[row];
            const colQ = quadrantMap[col];
            if (!rowQ || !colQ) return null;

            const rowItems = rowQ.rowItems || [];
            const colItems = colQ.rowItems || [];

            return (
              <Fade in={show} timeout={400} key={i}>
                <Box
                  sx={{
                    position: "absolute",
                    display: "grid",
                    gridTemplateColumns: `repeat(${colItems.length}, ${cellWidth}px)`,
                    gridTemplateRows: `repeat(${rowItems.length}, ${cellHeight}px)`,
                    ...style,
                  }}
                >
                  {rowItems.map((rowItem) =>
                    colItems.map((colItem) => (
                      <Box
                        onClick={(e) => {
                          setAnchorEl(e.currentTarget);
                        }}
                        key={`${rowItem.rowId}-${colItem.rowId}`}
                        sx={{
                          border: "0.5px dashed #ccc",
                          width: cellWidth,
                          height: cellHeight,
                          fontSize: "8px",
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                          justifyContent: "center",
                          backgroundColor: alpha("#000", 0.01),
                        }}
                        title={`${rowItem.rowName?.split(" ")[0]} X ${
                          colItem.rowName?.split(" ")[0]
                        }`}
                      >
                        {getIntersectionValue(rowItem, colItem)}
                      </Box>
                    ))
                  )}
                </Box>
              </Fade>
            );
          })}
        </Box>

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          {Object.entries(MAPPING).map(([key, value]) => (
            <Box
              key={key}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: 1,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: alpha("#000", 0.1),
                },
              }}
              onClick={() => setAnchorEl(null)}
            >
              <span style={{ paddingRight: "8px", fontSize: "16px" }}>
                {value.icon}
              </span>
              <span style={{ textAlign: "start", fontSize: "12px" }}>
                {value.label}
              </span>
            </Box>
          ))}
        </Popover>
      </Box>
    </>
  );
};

export default QuadrantsWithAniAnIntersections;
