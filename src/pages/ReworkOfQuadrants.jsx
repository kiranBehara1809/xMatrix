import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Avatar,
  Collapse,
  alpha,
  Tooltip,
  Popover,
  TextField,
} from "@mui/material";
import { QUADRANTS_CONSTANT } from "../db/quadrantsReConstant";
import QuadrantButtons from "./quadrantButtons";
import CircleIcon from "@mui/icons-material/Circle";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import CloseIcon from "@mui/icons-material/Close";
import Pill from "./Pill";

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

const BASE_COLOR_MAPPING = {
  "#01c666": "Annual Objectives",
  "#ff1744": "Long-Term Objectives",
  "#ff9100": "Metrics to Improve",
  "#2979ff": "Top Level Improvements",
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

const cellSize = 30;

function isTextOverflowing(i, position) {
  const el = document.getElementById(`${i}+${position}`);
  if (el) return el.scrollWidth > el.clientWidth;
}

const QuadrantListItem = ({
  item,
  i,
  position,
  actionIconHanlder = () => {},
}) => {
  const textRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      setShowTooltip(isTextOverflowing(textRef.current));
    }
  }, [item.rowName]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        borderBottom: "0.5px dotted #000",
        minHeight: 29,
        "&:hover": {
          width: position === "bottom" && item.rowName !== "" ? "85%" : "100%",
          transform:
            position === "bottom" && item.rowName !== ""
              ? "scale(1.15)"
              : "scale(1)",
          transition: "transform 1.5s ease",
        },
      }}
    >
      <Tooltip
        title={isTextOverflowing(i, position) ? item.rowName : ""}
        arrow
        placement="left-start"
      >
        <Typography
          id={`${i}+${position}`}
          ref={textRef}
          variant="caption"
          sx={{
            color: item.rowType === "quandrantRow" ? "#000" : "#a72c4b",
            width: "100%",
            minHeight: 30,
            fontSize: "11px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            lineHeight: 2.66,
            p: "0px 2px",
            textOverflow: "ellipsis",
            display: "inline-block", // required for ellipsis
          }}
        >
          {item.rowName}
        </Typography>
      </Tooltip>

      {position === "bottom" && item.rowName !== "" && (
        <>
          <EditIcon
            onClick={(e) => actionIconHanlder(e, item, "edit")}
            sx={{
              fontSize: 13,
              cursor: "pointer",
              pr: "2px",
              color: "#1976d2",
            }}
          />
          <DeleteIcon
            onClick={(e) => actionIconHanlder(e, item, "delete")}
            sx={{
              fontSize: 13,
              cursor: "pointer",
              pr: "2px",

              color: "red",
            }}
          />
        </>
      )}
    </Box>
  );
};

const TriangleBox = () => {
  const [data, setData] = useState(
    JSON.parse(JSON.stringify(QUADRANTS_CONSTANT))
  );
  const [defaultPositions, setDefaultPositions] = useState([
    "top",
    "right",
    "bottom",
    "left",
  ]);
  const [hideLists, setHideLists] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [addNewAnchorEl, setAddNewAnchorEl] = useState(null);
  const [tempVars, setTempVars] = useState({
    selectedRow: null,
    selectedCol: null,
    selectedPopoverValue: null,
  });
  const [editDeleteTempVars, setEditDeleteTempVars] = useState({
    editFlag: false,
    rowText: "",
    rowObj: null,
    action: null,
    isOwnerAdding: false,
    popoverTitle: "",
  });
  const [showQuadrants, setShowQuadrants] = useState({
    topRight: true,
    bottomRight: true,
    bottomLeft: true,
    topLeft: true,
  });

  const [animation, setAnimation] = useState({
    top: true,
    topRight: true,
    right: true,
    bottomRight: true,
    bottom: true,
    bottomLeft: true,
    left: true,
    topLeft: true,
  });

  const [margins, setMargin] = useState({
    topleft: { marginLeft: "78px" },
    topright: { marginLeft: "0px" },
    bottomleft: { marginLeft: "78px" },
    bottomright: { marginLeft: "0px" },
    topList: {},
    bottomList: {},
    leftList: { marginRight: "-78px" },
    rightList: { marginLeft: "0px" },
  });

  const gridCell = {
    border: "1px dashed gray",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.6rem",
    color: "#333",
  };

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
      setData((prev) => {
        let finalOuptut = prev.quadrants.map((quad) => {
          const updatedRowItems = quad.quadrantListItems.map((item) => {
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
            quadrantListItems: updatedRowItems,
          };
        });
        return { quadrants: finalOuptut };
      });

      closePopover();
    }
  }, [tempVars]);

  useEffect(() => {
    return () => {
      setDefaultPositions(["top", "right", "bottom", "left"]);
      setData(JSON.parse(JSON.stringify(QUADRANTS_CONSTANT)));
      setHideLists(() => false);
      setShowQuadrants((prev) => {
        return {
          topRight: true,
          bottomRight: true,
          bottomLeft: true,
          topLeft: true,
        };
      });
    };
  }, []);

  useEffect(() => {
    const blueQuadrant = data?.quadrants?.find((x) => x.basePosition === "top");
    if (!blueQuadrant) return;
    // Step 1: Hide all immediately
    setShowQuadrants((prev) => {
      return {
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      };
    });

    let targetState = {
      topRight: true,
      bottomRight: false,
      bottomLeft: true,
      topLeft: true,
    };

    if (blueQuadrant.updatedPosition === "right") {
      targetState = {
        topRight: true,
        bottomRight: true,
        bottomLeft: false,
        topLeft: true,
      };
    } else if (blueQuadrant.updatedPosition === "bottom") {
      targetState = {
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: false,
      };
    } else if (blueQuadrant.updatedPosition === "left") {
      targetState = {
        topRight: false,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      };
    }

    // Step 2: Show one by one based on targetState
    setTimeout(() => {
      const keys = Object.keys(targetState);
      keys.forEach((key, index) => {
        setShowQuadrants((prev) => ({
          ...prev,
          [key]: targetState[key],
        }));
      });
      setHideLists(() => false);
    }, 1500);
  }, [data]);

  const getQuadrant = (pos) =>
    data.quadrants.find((q) => q.quadrantPosition === pos);

  const rotateEntire = ({ index, buttonClick }) => {
    setHideLists(() => true);
    setData((prev) => {
      // triggerAnimationSequence();
      const positions = ["top", "right", "bottom", "left"];

      // Shift quadrant positions
      const newQuadrants = prev.quadrants.map((q) => {
        const currentIndex = positions.indexOf(q.quadrantPosition);
        let val =
          buttonClick === "FORWARD" ? currentIndex + 1 : currentIndex - 1;
        const nextIndex =
          ((val % positions.length) + positions.length) % positions.length;

        return {
          ...q,
          quadrantListItems:
            positions[nextIndex] === "left" || positions[nextIndex] === "right"
              ? [...q.quadrantListItems]?.reverse()
              : q.quadrantListItems,
          quadrantPosition: positions[nextIndex],
          updatedPosition: positions[nextIndex],
        };
      });

      // Shift colors
      const colors = prev.quadrants.map((q) => q.quadrantColor);
      let rotatedColors;

      if (buttonClick === "FORWARD") {
        rotatedColors = [colors[3], ...colors.slice(0, 3)];
      } else {
        rotatedColors = [...colors.slice(1), colors[0]];
      }

      newQuadrants.forEach((q, i) => {
        q.quadrantColor = rotatedColors[i];
      });

      // Update quadrant order in center triangles
      const updatedPositions = newQuadrants.map((q) => q.quadrantPosition);
      setDefaultPositions(updatedPositions);

      return {
        quadrants: newQuadrants,
      };
    });
  };

  useEffect(() => {
    if (defaultPositions[0] === "right") {
      setMargin((prev) => {
        return {
          topleft: { marginLeft: "78px" },
          topright: { marginLeft: "-39px" },
          bottomleft: { marginLeft: "78px" },
          bottomright: { marginLeft: "0px" },
          topList: {},
          bottomList: {},
          leftList: { marginRight: "-78px" },
          rightList: { marginLeft: "-39px" },
        };
      });
    }
    if (defaultPositions[0] === "left") {
      setMargin((prev) => {
        return {
          topleft: { marginLeft: "78px" },
          topright: { marginLeft: "-39px" },
          bottomleft: { marginLeft: "78px" },
          bottomright: { marginLeft: "0px" },
          topList: {},
          bottomList: {},
          leftList: { marginRight: "-78px" },
          rightList: { marginLeft: "-39px" },
        };
      });
    }

    if (defaultPositions[0] === "top") {
      // default view
      setMargin((prev) => {
        return {
          topleft: { marginLeft: "78px" },
          topright: { marginLeft: "0px" },
          bottomleft: { marginLeft: "78px" },
          bottomright: { marginLeft: "0px" },
          topList: {},
          bottomList: {},
          leftList: { marginRight: "-78px" },
          rightList: {},
        };
      });
    }
  }, [defaultPositions]);

  const getLength = (pos) => getQuadrant(pos)?.quadrantListItems.length || 0;

  const noOfBoxes = (a, b) => {
    const qAItems = getQuadrant(a)?.quadrantListItems;
    const qBItems = getQuadrant(b)?.quadrantListItems;
    let mappeditems = [];
    let outerLoop = qAItems;
    let innerLoop = qBItems;
    if (a === "left" && b === "bottom") {
      outerLoop = qBItems;
      innerLoop = qAItems;
    }
    outerLoop?.map((qa) => {
      innerLoop?.map((qb) => {
        mappeditems.push(`${qa.rowId}~~X~~${qb.rowId}`);
      });
    });
    return mappeditems;
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

  const closeAddPopover = () => {
    setAddNewAnchorEl(null);
    setEditDeleteTempVars((prev) => {
      return {
        ...prev,
        editFlag: false,
        isOwnerAdding: false,
        rowText: "",
        action: "",
        rowObj: null,
        popoverTitle: "",
      };
    });
  };

  const actionButtonClickHandler = (event, item, action) => {
    const userName = localStorage.getItem("userName");
    if (userName === "reader") {
      return;
    }
    setAddNewAnchorEl(event.currentTarget);
    setEditDeleteTempVars((prev) => {
      return {
        ...prev,
        editFlag: action === "edit",
        action: action,
        isOwnerAdding: item.rowType === "quandrantOwner",
        rowText: item.rowName,
        rowObj: item,
        popoverTitle: `${action === "delete" ? "Delete" : "Edit"} Row Item`,
      };
    });
  };

  const showPlotMapperPopover = (e, obj) => {
    setAnchorEl(e.currentTarget);
    const partsOfMap = obj.split("~~X~~");
    const allQItems = data.quadrants?.map((x) => {
      return x?.quadrantListItems;
    });

    let row = null;
    let column = null;
    allQItems?.map((qaItem, i) => {
      if (!row) {
        row = qaItem?.find((x) => x.rowId === partsOfMap[0]);
      }
      if (!column) column = qaItem?.find((x) => x.rowId === partsOfMap[1]);
    });
    setTempVars((prev) => ({
      ...prev,
      selectedRow: row,
      selectedCol: column,
      selectedPopoverValue: null,
    }));
  };

  const getNewIntersections = (quadrantA, quadrantB, obj) => {
    const partsOfMap = obj.split("~~X~~");
    let foundIntersections = [];

    const allQItems = data.quadrants?.map((x) => {
      return x?.quadrantListItems;
    });

    allQItems?.map((qaItem, i) => {
      const f1 = qaItem?.find((x) => x.rowId === partsOfMap[0]);
      const f2 = qaItem?.find((x) => x.rowId === partsOfMap[1]);
      if (f1) {
        foundIntersections = [
          ...foundIntersections,
          ...(f1?.intersections ?? []),
        ];
      }
      if (f2) {
        foundIntersections = [
          ...foundIntersections,
          ...(f2?.intersections ?? []),
        ];
      }
    });

    const a = foundIntersections?.find((x) => {
      if (
        obj === `${partsOfMap[0]}~~X~~${x["rowId"]}` ||
        obj === `${partsOfMap[1]}~~X~~${x["rowId"]}` ||
        obj === `${x["rowId"]}~~X~~${partsOfMap[0]}` ||
        obj === `${x["rowId"]}~~X~~${partsOfMap[1]}`
      ) {
        return x;
      } else {
        return "";
      }
    });
    if (a) {
      return MAPPING[a["type"]]?.icon ?? "";
    } else {
      return "";
    }
  };

  const handleSaveOfNewRow = () => {
    const { rowText, isOwnerAdding, editFlag, popoverTitle, rowObj, action } =
      editDeleteTempVars;

    // In case of delete action
    if (action === "delete" && rowObj?.rowId) {
      setData((prev) => {
        const updatedQuads = prev?.quadrants?.map((quad) => {
          return {
            ...quad,
            quadrantListItems: quad.quadrantListItems.filter(
              (item) => item.rowId !== rowObj.rowId
            ),
          };
        });
        return { quadrants: updatedQuads };
      });

      closeAddPopover();
      return;
    }

    // For add/edit logic
    const newRowObj = {
      rowName: rowText,
      rowId: editFlag ? rowObj?.rowId : crypto.randomUUID(),
      rowType: isOwnerAdding ? "quandrantOwner" : "quandrantRow",
    };

    setData((prev) => {
      const updatedQuads = prev?.quadrants?.map((quad) => {
        // Only update the bottom quadrant
        if (quad.quadrantPosition !== "bottom") return quad;
        let updatedRowItems;

        if (editFlag && rowObj) {
          // Edit mode: update rowName of the matching row
          updatedRowItems = quad.quadrantListItems.map((item) =>
            item.rowId === rowObj?.rowId ? { ...item, rowName: rowText } : item
          );
        } else {
          // Add mode: insert new row via your existing helper
          updatedRowItems = latestRowItems(quad, newRowObj, isOwnerAdding);
        }

        return {
          ...quad,
          quadrantListItems: updatedRowItems,
        };
      });

      return { quadrants: updatedQuads };
    });

    closeAddPopover();
  };

  const latestRowItems = (quad, newRowObj, isOwnerAdding) => {
    if (quad.quadrantPosition !== "bottom") {
      return quad.quadrantListItems;
    }
    if (quad.basePosition === "top" || quad.basePosition === "left") {
      return [...quad.quadrantListItems, newRowObj];
    }
    if (quad.basePosition === "right" && isOwnerAdding) {
      let arr = quad.quadrantListItems;
      return [
        ...arr.slice(0, quad?.quadrantListItems?.length),
        newRowObj,
        // ...arr.slice(quad?.quadrantListItems?.length - 1),
      ];
    }
    if (quad.basePosition === "right" && !isOwnerAdding) {
      return [newRowObj, ...quad.quadrantListItems];
    }
    if (quad.basePosition === "bottom") {
      return [...quad.quadrantListItems, newRowObj];
    }
  };

  return (
    <>
      {/* <Pill label="Notification sent!" showDuration={2000} /> */}

      <UserDetails />
      <ProjectHeader />
      <QuadrantButtons emitSelectedRotation={rotateEntire} show={true} />
      <LegendComponent />

      <Box
        sx={{
          height: "100dvh",
          width: "100dvw",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateAreas: `
            "top-left top top-right"
            "left center right"
            "bottom-left bottom bottom-right"
          `,
            gridTemplateColumns: "auto 200px auto",
            gridTemplateRows: "auto 200px auto",
            justifyItems: "center",
            alignItems: "center",
            padding: 2,
          }}
        >
          {/* Render each side dynamically */}
          {/* Top - vertical */}
          <Box
            gridArea="top"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: `${getLength("top") * cellSize}px`,
              width: "200px",
              opacity: !hideLists ? 1 : 0,
              transform: !hideLists ? "scale(1)" : "scale(0.95)",
              pointerEvents: !hideLists ? "auto" : "none",
              transition: "opacity 1.5s ease, transform 1.5s ease",
              background: "lightgray",
              //   ...margins.topright,
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            }}
          >
            {getQuadrant("top").quadrantListItems.map((item, i) => (
              <QuadrantListItem item={item} i={i} position="top" key={i} />
            ))}
          </Box>

          {/* Right - horizontal */}
          <Box
            gridArea="right"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: `${getLength("right") * cellSize}px`,
              width: "200px",
              transform: "rotate(-90deg)",
              background: "lightgray",
              opacity: !hideLists ? 1 : 0,
              pointerEvents: !hideLists ? "auto" : "none",
              transition: "opacity 2s ease, transform 2s ease",
              ...margins.rightList,
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            }}
          >
            {getQuadrant("right").quadrantListItems.map((item, i) => (
              <QuadrantListItem item={item} i={i} position="right" key={i} />
            ))}
          </Box>

          {/* Bottom - vertical */}
          <Box
            gridArea="bottom"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: `${getLength("bottom") * cellSize + 30}px`,
              width: "200px",
              opacity: !hideLists ? 1 : 0,
              transform: !hideLists ? "scale(1)" : "scale(0.95)",
              pointerEvents: !hideLists ? "auto" : "none",
              transition: "opacity 2s ease, transform 2s ease",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            }}
          >
            {getQuadrant("bottom").quadrantListItems.map((item, i) => (
              <QuadrantListItem
                item={item}
                i={i}
                position="bottom"
                key={i}
                actionIconHanlder={actionButtonClickHandler}
              />
            ))}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                minHeight: 30,
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={(e) => {
                  const userName = localStorage.getItem("userName");
                  if (userName === "reader") {
                    return;
                  }
                  setAddNewAnchorEl(e.currentTarget);
                  setEditDeleteTempVars((prev) => {
                    return {
                      ...prev,
                      editFlag: false,
                      action: "new",
                      isOwnerAdding: false,
                      rowText: "",
                      rowObj: null,
                      popoverTitle: `Add Row Item`,
                    };
                  });
                }}
              >
                <AddBoxIcon
                  sx={{
                    fontSize: 13,
                    cursor: "pointer",
                    pr: "2px",
                    color: "#1976d2",
                  }}
                />
                <Typography variant="caption" sx={{ color: "#000" }}>
                  Add New
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={(e) => {
                  setAddNewAnchorEl(e.currentTarget);
                  setEditDeleteTempVars((prev) => {
                    return {
                      ...prev,
                      editFlag: false,
                      action: "new",
                      isOwnerAdding: true,
                      rowText: "",
                      rowObj: null,
                      popoverTitle: `Add Owner`,
                    };
                  });
                }}
              >
                {getQuadrant("bottom").quadrantListItems?.filter(
                  (x) => x.rowType === "quandrantOwner"
                )?.length > 1 && (
                  <>
                    <AddBoxIcon
                      sx={{
                        fontSize: 13,
                        ml: 1,
                        cursor: "pointer",
                        pr: "2px",
                        color: "#1976d2",
                      }}
                    />
                    <Typography variant="caption" sx={{ color: "#000" }}>
                      Add New Owner
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          </Box>

          {/* Left - horizontal */}
          <Box
            gridArea="left"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: `${getLength("left") * cellSize}px`,
              width: "200px",
              transform: "rotate(-90deg)",
              background: "lightGray",
              opacity: !hideLists ? 1 : 0,
              pointerEvents: !hideLists ? "auto" : "none",
              transition: "opacity 2s ease, transform 2s ease",
              ...margins.leftList,
            }}
          >
            {getQuadrant("left").quadrantListItems.map((item, i) => (
              <QuadrantListItem item={item} i={i} position="left" key={i} />
            ))}
          </Box>

          {/* Center square with triangles - dynamic colors */}
          <Box
            gridArea="center"
            sx={{
              width: 200,
              height: 200,
              position: "relative",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            {data.quadrants.map((q, i) => {
              // Define clip paths for top, right, bottom, left
              const clipPaths = [
                "polygon(0% 0%, 100% 0%, 50% 50%)", // top
                "polygon(100% 0%, 100% 100%, 50% 50%)", // right
                "polygon(100% 100%, 0% 100%, 50% 50%)", // bottom
                "polygon(0% 100%, 0% 0%, 50% 50%)", // left
              ];

              // Approximate text positions for each triangle
              const textPositions = [
                { top: "1%", left: "50%", transform: "translateX(-50%)" }, // top center
                { top: "50%", right: "1%", transform: "translateY(-50%)" }, // right center
                { bottom: "1%", left: "50%", transform: "translateX(-50%)" }, // bottom center
                { top: "50%", left: "1%", transform: "translateY(-50%)" }, // left center
              ];

              const index = defaultPositions.indexOf(q.quadrantPosition);

              return (
                <Box
                  key={q.quadrantName}
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    clipPath: clipPaths[index],
                    backgroundColor: alpha(q.quadrantColor, 0.1),
                    transform: !hideLists ? "rotate(0deg)" : "rotate(180deg)",
                    transition: !hideLists ? "transform 0.3s linear" : "none",
                    // willChange: !hideLists
                    //   ? "transform, clip-path"
                    //   : "clip-path",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      color: "#fff",
                      pointerEvents: "none",
                      maxWidth: "70px",
                      fontWeight: "500",
                      // backgroundColor: "rgba(255, 255, 255, 0.7)",
                      backgroundColor: alpha(q.quadrantColor, 1),
                      backdropFilter: "blur(20px)",
                      padding: "2px 5px",
                      textAlign: "center",
                      fontSize: "10px",
                      borderRadius: "8px",
                      opacity: !hideLists ? 1 : 0,
                      transition: !hideLists ? "opacity 2s linear" : "none",
                      ...textPositions[index],
                    }}
                  >
                    {BASE_COLOR_MAPPING[q.quadrantColor]}
                  </Box>
                </Box>
              );
            })}
          </Box>
          {/* Grids for corners */}

          {/* Top-Right Grid */}
          {/* {showQuadrants?.topRight && ( */}
          {/* TOP-LEFT QUADRANT */}
          <Box
            gridArea="top-left"
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${getLength("left")}, 1fr)`,
              gridTemplateRows: `repeat(${getLength("top")}, 1fr)`,
              width: `${getLength("left") * cellSize}px`,
              height: `${getLength("top") * cellSize}px`,
              border: "none !important",
              ...margins.topleft,
              opacity: showQuadrants.topLeft ? 1 : 0,
              transform: showQuadrants.topLeft ? "scale(1)" : "scale(0.95)",
              pointerEvents: showQuadrants.topLeft ? "auto" : "none",
              transition: "opacity 2s ease-out, transform 2s ease-out",
              "& > div": gridCell,
            }}
          >
            {noOfBoxes("top", "left").map((val, i) => (
              <Box
                key={i}
                title={val}
                sx={{ border: "0.5px dashed gray !important" }}
                onClick={(e) => showPlotMapperPopover(e, val)}
              >
                {getNewIntersections("top", "left", val)}
              </Box>
            ))}
          </Box>

          {/* TOP-RIGHT QUADRANT */}
          <Box
            gridArea="top-right"
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${getLength("right")}, 1fr)`,
              gridTemplateRows: `repeat(${getLength("top")}, 1fr)`,
              width: `${getLength("right") * cellSize}px`,
              height: `${getLength("top") * cellSize}px`,
              border: "none !important",
              ...margins.rightList,
              opacity: showQuadrants.topRight ? 1 : 0,
              transform: showQuadrants.topRight ? "scale(1)" : "scale(0.95)",
              pointerEvents: showQuadrants.topRight ? "auto" : "none",
              transition: "opacity 2s ease-out, transform 2s ease-out",
              "& > div": gridCell,
            }}
          >
            {noOfBoxes("top", "right").map((val, i) => (
              <Box
                key={i}
                title={val}
                sx={{ border: "0.5px dashed gray !important" }}
                onClick={(e) => showPlotMapperPopover(e, val)}
              >
                {getNewIntersections("top", "right", val)}
              </Box>
            ))}
          </Box>

          {/* BOTTOM-LEFT QUADRANT */}
          <Box
            gridArea="bottom-left"
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${getLength("left")}, 1fr)`,
              gridTemplateRows: `repeat(${getLength("bottom")}, 1fr)`,
              width: `${getLength("left") * cellSize}px`,
              height: `${getLength("bottom") * cellSize}px`,
              border: "none !important",
              mt: "-30px",
              ...margins.bottomleft,
              opacity: showQuadrants.bottomLeft ? 1 : 0,
              transform: showQuadrants.bottomLeft ? "scale(1)" : "scale(0.95)",
              pointerEvents: showQuadrants.bottomLeft ? "auto" : "none",
              transition: "opacity 2s ease-out, transform 2s ease-out",
              "& > div": gridCell,
            }}
          >
            {noOfBoxes("left", "bottom").map((val, i) => (
              <Box
                key={i}
                title={val}
                sx={{ border: "0.5px dashed gray !important" }}
                onClick={(e) => showPlotMapperPopover(e, val)}
              >
                {getNewIntersections("bottom", "left", val)}
              </Box>
            ))}
          </Box>

          {/* BOTTOM-RIGHT QUADRANT */}
          <Box
            gridArea="bottom-right"
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${getLength("right")}, 1fr)`,
              gridTemplateRows: `repeat(${getLength("bottom")}, 1fr)`,
              width: `${getLength("right") * cellSize}px`,
              height: `${getLength("bottom") * cellSize}px`,
              border: "none !important",
              mt: "-30px",
              ...margins.topright, // consider renaming if reused here
              opacity: showQuadrants.bottomRight ? 1 : 0,
              transform: showQuadrants.bottomRight ? "scale(1)" : "scale(0.95)",
              pointerEvents: showQuadrants.bottomRight ? "auto" : "none",
              transition: "opacity 2s ease-out, transform 2s ease-out",
              "& > div": gridCell,
            }}
          >
            {noOfBoxes("bottom", "right").map((val, i) => (
              <Box
                key={i}
                title={val}
                sx={{ border: "0.5px dashed gray !important" }}
                onClick={(e) => showPlotMapperPopover(e, val)}
              >
                {getNewIntersections("bottom", "right", val)}
              </Box>
            ))}
          </Box>
        </Box>
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
        onClose={() => closeAddPopover()}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              minHeight: 25,
              mb: 0.5,
              minWidth: 300,
            }}
          >
            <Typography variant="body2">
              {editDeleteTempVars?.popoverTitle}
            </Typography>
            <CloseIcon
              style={{ fontSize: 13, cursor: "pointer" }}
              onClick={closeAddPopover}
            />
          </Box>
          <TextField
            size="small"
            fullWidth
            placeholder="Enter here..."
            variant="outlined"
            sx={{
              minWidth: "300px",
              "& .MuiInputBase-input": {
                fontSize: "13px",
              },
            }}
            disabled={editDeleteTempVars?.action === "delete"}
            value={editDeleteTempVars?.rowText}
            autoFocus
            onChange={(e) =>
              setEditDeleteTempVars((prev) => {
                return {
                  ...prev,
                  rowText: e.target.value,
                };
              })
            }
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            {editDeleteTempVars?.action === "delete" && (
              <Button
                size="small"
                fullWidth
                onClick={handleSaveOfNewRow}
                sx={{ textTransform: "capitalize" }}
                variant="contained"
              >
                Delete
              </Button>
            )}
            {editDeleteTempVars?.action !== "delete" && (
              <Button
                size="small"
                fullWidth
                onClick={handleSaveOfNewRow}
                sx={{ textTransform: "capitalize" }}
                variant="contained"
              >
                Save
              </Button>
            )}
            <Button
              size="small"
              fullWidth
              color="error"
              onClick={closeAddPopover}
              sx={{ ml: 1, textTransform: "capitalize" }}
              variant="contained"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default TriangleBox;
