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
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import { QUADRANTS } from "../db/quadrants";
import CircleIcon from "@mui/icons-material/Circle";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import QuadrantButtonsOld from "./quadButtonOld";
import CreateIcon from "@mui/icons-material/Create";

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
        height: "30px",
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
    value: "RL",
    icon: (
      <CircleIcon
        fontSize="small"
        style={{ fontSize: "10px", color: "#000" }}
      />
    ),
  },
  PR: {
    label: "Primary Responsibility",
    value: "PR",
    icon: (
      <PanoramaFishEyeIcon
        fontSize="small"
        style={{ fontSize: "10px", color: "#000" }}
      />
    ),
  }, // PRIMARY RESPONSIBILITY
  SR: {
    label: "Secondary Responsibility",
    value: "SR",
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

const QuadrantsWithAniAnIntersections = () => {
  const [show, setShow] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [addNewAnchorEl, setAddNewAnchorEl] = useState(null);
  const [isOwnerAdding, setIsOwnerAdding] = useState(false);
  const [isEditFlag, setIsEditFlag] = useState(null);
  const [newRowText, setNewRowText] = useState("");
  const [initialRotation, setInitialRotation] = useState(0);
  const [showEverything, setShowEverything] = useState(true);
  const [rotatedQuads, setRotatedQuads] = useState([]);
  const [dynamicPlacementsOfPlots, setDynamicPlacementsOfPlots] = useState({
    "top-listitems": null,
    "bottom-listitems": null,
    "left-listitems": null,
    "right-listitems": null,
  });
  const [tempVars, setTempVars] = useState({
    selectedRow: null,
    selectedCol: null,
    selectedPopoverValue: null,
  });

  useEffect(() => {
    handleRotation(2);
    setTimeout(() => {
      handleRotation(0);
    }, 1050);
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
    setRotatedQuads((prev) => {
      if (prev.length > 0) {
        return rotateQuadrants(prev);
      }
      return rotateQuadrants(quadrantsForThisComponent);
    });
    getDynamicPlacement();
  }, [initialRotation]);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (userName === "reader") {
      return;
    }
    const { selectedRow, selectedCol, selectedPopoverValue } = tempVars;

    if (selectedRow && selectedCol && selectedPopoverValue) {
      const rowId = selectedRow.rowId;
      const colId = selectedCol.rowId;
      const intersectionType = selectedPopoverValue.value;
      setRotatedQuads((prevQuads) => {
        let finalOuptut = prevQuads.map((quad) => {
          const updatedRowItems = quad.rowItems.map((item) => {
            // Only update if this is one of the selected rows
            if (item.rowId !== rowId && item.rowId !== colId) {
              return item;
            }

            let newIntersections = [...(item.intersections || [])];
            const existingIndex = newIntersections.findIndex(
              (i) => i.rowId === rowId || i.rowId === colId
            );

            // If exists, update type
            if (existingIndex !== -1) {
              newIntersections[existingIndex] = {
                ...newIntersections[existingIndex],
                type: intersectionType === "EMPTY" ? "" : intersectionType,
              };
            } else {
              // Else push new intersection
              newIntersections.push({
                rowId: item.rowId === rowId ? colId : rowId,
                type: intersectionType === "EMPTY" ? "" : intersectionType,
              });
            }

            return {
              ...item,
              intersections: newIntersections,
            };
          });

          return {
            ...quad,
            rowItems: updatedRowItems,
          };
        });
        return rotateQuadrants(finalOuptut);
      });

      closePopover();
    }
  }, [tempVars]);

  const quadrantMap = Object.fromEntries(
    rotatedQuads.map((q) => [q.defaultPostion, q])
  );

  const getDynamicPlacement = () => {
    const placements = [
      "top-listitems",
      "bottom-listitems",
      "left-listitems",
      "right-listitems",
    ];
    placements.map((y) => {
      let el = document.getElementById(y);
      if (el) {
        const { top, bottom, left, right } = el.getBoundingClientRect();
        setDynamicPlacementsOfPlots((prev) => {
          return {
            ...prev,
            [y]: { top, right, bottom, left },
          };
        });
      }
    });
  };

  const latestRowItems = (quad, newRowObj) => {
    if (quad.updatedPosition !== "bottom") {
      return quad.rowItems;
    }
    if (quad.defaultPostion === "top" || quad.defaultPostion === "left") {
      return [...quad.rowItems, newRowObj];
    }
    if (quad.defaultPostion === "right" && isOwnerAdding) {
      let arr = quad.rowItems;
      return [
        ...arr.slice(0, quad?.rowItems?.length - 1),
        newRowObj,
        ...arr.slice(quad?.rowItems?.length - 1),
      ];
    }
    if (quad.defaultPostion === "right" && !isOwnerAdding) {
      return [newRowObj, ...quad.rowItems];
    }
  };

  const handleSaveOfNewRow = () => {
    const inputValue = newRowText;

    // Create row ID and type only if adding
    const newRowObj = {
      rowName: inputValue,
      rowId: isEditFlag || crypto.randomUUID(),
      rowType: isOwnerAdding ? "quandrantOwner" : "quandrantRow",
    };

    setRotatedQuads((prevQuads) => {
      const updatedQuads = prevQuads.map((quad) => {
        // Only update "bottom" quadrant
        if (quad.updatedPosition !== "bottom") return quad;

        let updatedRowItems;

        if (isEditFlag !== null) {
          // Edit mode: update rowName of the matching row
          updatedRowItems = quad.rowItems.map((item) =>
            item.rowId === isEditFlag?.rowId
              ? { ...item, rowName: inputValue }
              : item
          );
        } else {
          // Add mode: insert new row via your existing helper
          updatedRowItems = latestRowItems(quad, newRowObj);
        }

        return {
          ...quad,
          rowItems: updatedRowItems,
        };
      });

      return rotateQuadrants(updatedQuads);
    });

    // Reset UI state
    setAddNewAnchorEl(null);
    setNewRowText("");
    setIsOwnerAdding(false);
    setIsEditFlag(null);
  };

  const closePopover = () => {
    setAnchorEl(null);
    setTempVars((prev) => ({
      ...prev,
      selectedRow: null,
      selectedCol: null,
      selectedPopoverValue: null,
    }));
  };

  const getUpdatedPosition = (quadrantObj) => {
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

  const rotateQuadrants = (quads) => {
    let a = quads.map((q) => {
      return {
        ...q,
        updatedPosition: getUpdatedPosition(q),
      };
    });
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
        // overflowY: "auto",
      },
    },
    right: {
      clipPath: "polygon(100% 0, 100% 100%, 50% 50%)",
      labelPosition: { top: "50%", left: "80%" },
      listPosition: {
        top: "38%",
        left: "101.5%",
        transform: "translate3d(1%,60%,0) rotate(-90deg)",
        transformOrigin: "left top",
        width: 240,
        maxHeight: 250,
        overflowY: "auto",
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
        right: "101.5%",
        transform: "translate3d(-55%, -95%, 0) rotate(-90deg)",
        transformOrigin: "right top",
        width: 240,
        maxWidth: 240,
        // maxWidth: 210,
        height: "auto",
        maxHeight: 250,
        overflowY: "auto",
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
        // top: `-${(quadrantMap.top?.rowItems?.length ?? 0) * cellHeight + 5}px`,
        bottom: dynamicPlacementsOfPlots["right-listitems"]?.top - 32,
        // top: "-48%",
        left: "100%",
        transform: "translate3d(8px, -5px, 0)",
      },
    },
    {
      row: "top",
      col: "left",
      style: {
        // top: `-${(quadrantMap.left?.rowItems?.length ?? 0) * cellHeight + 5}px`,
        // top: "-48%",
        bottom: dynamicPlacementsOfPlots["right-listitems"]?.top - 30,
        right: "100%",
        transform: "translateX(-8px)",
      },
    },
    {
      row: "bottom",
      col: "left",
      style: {
        // top: "100%",
        top: dynamicPlacementsOfPlots["right-listitems"]?.top - 30,
        right: "100%",
        transform: "translate(-8px, 0px)",
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
        <QuadrantButtonsOld emitSelectedRotation={handleRotation} show={show} />
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
            transition: "transform 1s ease-in-out",
            //   animation: rotating
            //     ? `${rotateAnimation} 1s forwards`
            //     : `${reverseRotateAnimation} 1s forwards`,
          }}
        >
          {/* 🧭 Render Quadrants */}
          {rotatedQuads.map((quad, index) => {
            const position = quad.defaultPostion;
            const updatedPosition = quad.updatedPosition;
            const config = quadrantConfigs[position];
            if (!config) return null;

            return (
              <React.Fragment key={index}>
                <Box
                  id="quadrangle"
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
                    maxWidth: "78px",
                    minWidth: "78px",
                    transform: `translate(-50%, -50%) rotate(${-initialRotation}deg)`,
                    transition: "transform 1.5s ease-in-out",
                  }}
                >
                  {quad.quadrantName}
                </Typography>
                <Collapse in={show}>
                  <Box
                    id={`${quad.updatedPosition}-listitems`}
                    sx={{
                      position: "absolute",
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: 2,
                      boxShadow: 3,
                      fontSize: "12px",
                      ...config.listPosition,
                      "&::-webkit-scrollbar": { display: "none" },
                    }}
                  >
                    {quad?.rowItems?.map((item, index) => (
                      <React.Fragment key={item.rowId}>
                        {/* <Tooltip title={item.rowName} arrow placement="right"> */}
                        <Typography
                          id={item.rowId}
                          sx={{
                            color:
                              item.rowType === "quandrantOwner"
                                ? "#a72c4b"
                                : "#000",
                            fontSize: "11px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            padding: "3px",
                            background:
                              quad.updatedPosition !== "bottom"
                                ? "lightgray"
                                : "transparent",
                            textAlign:
                              (index + 1 === quad.rowItems?.length ||
                                index === 0) &&
                              quad.updatedPosition === "bottom" &&
                              item.rowName === ""
                                ? "center"
                                : "left",
                            cursor:
                              (index + 1 === quad.rowItems?.length ||
                                index === 0) &&
                              quad.updatedPosition === "bottom" &&
                              item.rowName === ""
                                ? "pointer"
                                : "",
                            minHeight: "18px",
                            maxHeight: "18px",
                            transform: getRowNameStyle(quad),
                            // ...item.styles,
                          }}
                          // onClick={() => addNewRowHandler(quad, item)}
                        >
                          {(index + 1 === quad.rowItems?.length ||
                            index === 0) &&
                          quad.updatedPosition === "bottom" &&
                          item.rowName === "" ? (
                            <span
                              style={{
                                display: "flex",
                                justifyContent:
                                  quad.defaultPostion === "right"
                                    ? "space-evenly"
                                    : "center",
                                alignItems: "center",
                              }}
                            >
                              <span
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                                onClick={(e) => {
                                  const userName =
                                    localStorage.getItem("userName");
                                  if (userName === "reader") {
                                    return;
                                  }
                                  setAddNewAnchorEl(e.currentTarget);
                                  setIsEditFlag(null);
                                }}
                              >
                                <AddBoxIcon
                                  style={{
                                    fontSize: "16px",
                                    color: "#1976d2",
                                  }}
                                />
                                <span style={{ paddingLeft: "4px" }}>Add</span>
                              </span>
                              {quad.defaultPostion === "right" && (
                                <span
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                  onClick={(e) => {
                                    const userName =
                                      localStorage.getItem("userName");
                                    if (userName === "reader") {
                                      return;
                                    }
                                    setAddNewAnchorEl(e.currentTarget);
                                    setIsOwnerAdding(() => true);
                                    setIsEditFlag(null);
                                  }}
                                >
                                  <AddBoxIcon
                                    style={{
                                      fontSize: "16px",
                                      color: "#1976d2",
                                    }}
                                  />
                                  <span style={{ paddingLeft: "4px" }}>
                                    Add an Owner
                                  </span>
                                </span>
                              )}
                            </span>
                          ) : (
                            <>
                              <Tooltip
                                title={
                                  item.rowName?.length > 45 ? item.rowName : ""
                                }
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span
                                    style={{
                                      width:
                                        quad?.updatedPosition === "bottom"
                                          ? "90%"
                                          : "100%",
                                      overflow: "hidden",
                                    }}
                                  >
                                    {item.rowName}
                                  </span>
                                  {quad?.updatedPosition === "bottom" && (
                                    <CreateIcon
                                      onClick={(e) => {
                                        if (quad.updatedPosition === "bottom") {
                                          setAddNewAnchorEl(e.currentTarget);
                                          setNewRowText(item.rowName);
                                          setIsEditFlag(item);
                                          setIsOwnerAdding(() => false);
                                        }
                                      }}
                                      style={{
                                        paddingLeft: "4px",
                                        fontSize: "16px",
                                        color: "#1976d2",
                                        cursor : "pointer"
                                      }}
                                    />
                                  )}
                                </Box>
                              </Tooltip>
                            </>
                          )}
                        </Typography>
                        {/* </Tooltip> */}
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
                    // ...dynamicPlacementsOfPlots[`${row}-listitems`],
                  }}
                >
                  {rowItems.map((rowItem) =>
                    colItems.map((colItem) => (
                      <Box
                        onClick={(e) => {
                          e.stopPropagation();
                          setTempVars((prev) => {
                            return {
                              ...prev,
                              selectedCol: colItem,
                              selectedRow: rowItem,
                            };
                          });
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
          onClose={() => closePopover()}
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
              onClick={() => {
                setTempVars((prev) => {
                  return {
                    ...prev,
                    selectedPopoverValue: value,
                  };
                });
              }}
            >
              <span style={{ paddingRight: "8px", fontSize: "16px" }}>
                {value.icon}
              </span>
              <span style={{ textAlign: "start", fontSize: "12px" }}>
                {value.label}
              </span>
            </Box>
          ))}
          <Box
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
            onClick={() => {
              setTempVars((prev) => {
                return {
                  ...prev,
                  selectedPopoverValue: "EMPTY",
                };
              });
            }}
          >
            <span style={{ paddingRight: "8px", fontSize: "16px" }}>
              <DoDisturbIcon style={{ fontSize: "10px", color: "#000" }} />
            </span>
            <span style={{ textAlign: "start", fontSize: "12px" }}>None</span>
          </Box>
        </Popover>

        <Popover
          open={Boolean(addNewAnchorEl)}
          anchorEl={addNewAnchorEl}
          onClose={() => {
            setAddNewAnchorEl(null);
            setNewRowText("");
            setIsOwnerAdding(false);
            setIsEditFlag(null);
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          sx={{ ml: 5, mt: 1 }}
        >
          <Box sx={{ p: 1 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              {newRowText === "" && (
                <span style={{ margin: "2px 5px 7px 2px", fontSize: "14px" }}>
                  Add New {isOwnerAdding ? "Owner" : "Row"}
                </span>
              )}
              {newRowText !== "" && (
                <span style={{ margin: "2px 5px 7px 2px", fontSize: "14px" }}>
                  Edit
                </span>
              )}
              <span
                onClick={() => {
                  setAddNewAnchorEl(null);
                  setNewRowText("");
                  setIsOwnerAdding(false);
                }}
                style={{
                  cursor: "pointer",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                  padding: "0px 8px",
                  borderRadius: "8px",
                }}
              >
                x
              </span>
            </Box>
            <TextField
              size="small"
              placeholder="Enter here..."
              variant="outlined"
              sx={{ minWidth: "250px" }}
              value={newRowText}
              autoFocus
              onChange={(e) => setNewRowText(e.target.value)}
            />

            <Button
              disabled={newRowText === ""}
              sx={{ ml: 1, textTransform: "capitalize" }}
              variant="contained"
              onClick={handleSaveOfNewRow}
            >
              Save
            </Button>
          </Box>
        </Popover>
      </Box>
    </>
  );
};

export default QuadrantsWithAniAnIntersections;
