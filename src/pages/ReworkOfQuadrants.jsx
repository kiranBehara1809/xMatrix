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
  Select,
  MenuItem,
  ListItemText,
} from "@mui/material";
import PerplexityFinance from "../assets/PerplexityFinance.png";
import { ALL_CATEGORIES, QUADRANTS_CONSTANT } from "../db/quadrantsReConstant";
import QuadrantButtons from "./quadrantButtons";
import CircleIcon from "@mui/icons-material/Circle";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import { OpenInFull, PriorityHigh } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalData } from "../redux/globalDataSlice";
import CustomDialog from "./components/CustomDialog";
import LegendComponent from "./Legend";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { styled } from "@mui/system";

const BASE_COLOR_MAPPING = {
  "#01c666": "Annual Objectives",
  "#ff1744": "Long-Term Objectives",
  "#ff9100": "Metrics to Improve",
  "#2979ff": "Top Level Improvements",
};

// Styled component for the animated border
const AnimatedBorderBox = styled(Box)(({ theme, style, showAnimation }) => ({
  position: "relative",
  display: "inline-flex",
  background: "#fff", // Background to prevent bleed-through
  border: 1,
  ...style,
  ...(showAnimation && {
    "&::before": {
      content: '""',
      position: "absolute",
      top: -2,
      left: -2,
      right: -2,
      bottom: -2,
      border: "2px solid transparent",
      background: "linear-gradient(45deg, #f06, #48f, #0ff, #f06) border-box",
      backgroundSize: "400%",
      animation: "borderAnimation 4s linear infinite",
      zIndex: -1,
    },
  }),

  "@keyframes borderAnimation": {
    "0%": {
      backgroundPosition: "0% 50%",
    },
    "100%": {
      backgroundPosition: "400% 50%",
    },
  },
}));

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

const cellSize = 32;

function isTextOverflowing(i, position) {
  const el = document.getElementById(`${i}+${position}`);
  if (el) return el.scrollWidth > el.clientWidth;
}

const QuadrantListItem = ({
  item,
  i,
  position,
  actionIconHanlder = () => {},
  rowClickHandler = () => {},
}) => {
  const dispatch = useDispatch();
  const [isRowHovered, setIsRowHovered] = useState(false);
  const globalData = useSelector((state) => state.globalData?.data);
  const [showHighlightResetModal, setShowHighlightResetModal] = useState(null);
  const textRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // State to track zoom level

  // Function to check if text is overflowing
  const isTextOverflowing = (element) => {
    return element?.scrollWidth > element?.clientWidth;
  };

  const handleResetHighlightModal = () => {
    if (!showHighlightResetModal) {
      return;
    }
    const updatedData = globalData?.quadrants?.map((x) => {
      const updatedQuadrantListItems = x?.quadrantListItems?.map((y) => {
        return {
          ...y,
          highlight:
            y.rowId === showHighlightResetModal?.rowId
              ? null
              : y?.highlight ?? null,
        };
      });
      return {
        ...x,
        quadrantListItems: updatedQuadrantListItems,
      };
    });
    dispatch(setGlobalData({ quadrants: updatedData }));
    setShowHighlightResetModal(null);
  };

  useEffect(() => {
    if (textRef.current) {
      setShowTooltip(isTextOverflowing(textRef.current));
    }
  }, [item.rowName]);

  // Monitor zoom level changes
  useEffect(() => {
    const updateZoomLevel = () => {
      const el = document.getElementById("centralsquare");
      if (!el) {
        setZoomLevel(1);
        return;
      }
      const computedStyle = window.getComputedStyle(el);
      const transform = computedStyle.transform;

      if (transform && transform !== "none") {
        const match = transform.match(/matrix\(([^)]+)\)/);
        if (match) {
          const values = match[1].split(", ");
          const scaleX = parseFloat(values[0]);
          setZoomLevel(scaleX);
        } else {
          setZoomLevel(1);
        }
      } else {
        setZoomLevel(1);
      }
    };

    // Initial check
    updateZoomLevel();

    // Optional: Poll for changes if transform updates dynamically
    const interval = setInterval(updateZoomLevel, 500); // Adjust interval as needed

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const TOOLTIP_FONT_SIZES = useMemo(
    () => ({
      1: "12px",
      1.05: "12px",
      1.1: "13px",
      1.15: "13px",
      1.2: "14px",
      1.25: "14px",
      1.3: "16px",
      1.35: "16px",
      1.4: "18px",
      1.45: "18px",
      1.5: "19px",
    }),
    []
  );

  // Function to get the closest font size based on zoom level
  const getFontSizeForZoom = (zoom) => {
    const availableZooms = Object.keys(TOOLTIP_FONT_SIZES)
      .map(Number)
      .sort((a, b) => a - b);
    const closestZoom = availableZooms.reduce((prev, curr) =>
      Math.abs(curr - zoom) < Math.abs(prev - zoom) ? curr : prev
    );
    const fontSize = TOOLTIP_FONT_SIZES[closestZoom] || "12px";
    return fontSize;
  };

  const tooltipFontSize = getFontSizeForZoom(zoomLevel);

  return (
    <>
      <Box
        onClick={() => {
          rowClickHandler(item);
        }}
        onMouseEnter={() => setIsRowHovered(true)}
        onMouseLeave={() => setIsRowHovered(false)}
        sx={{
          // cursor:
          //   !item?.highlightEnabled ||
          //   item?.highlight === undefined ||
          //   item?.highlight === null
          //     ? "default"
          //     : "pointer",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "space-between",
          // width: position === "bottom" ? 320 : 320,
          // borderBottom: "5px dotted #000",
          minHeight: 32,
          // position: "relative",
          // overflow: "hidden",
        }}
      >
        <AnimatedBorderBox
          style={{
            cursor:
              !item?.highlightEnabled ||
              item?.highlight === undefined ||
              item?.highlight === null
                ? "default"
                : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: position === "bottom" ? 320 : 320,
            boxShadow:
              item?.highlightEnabled &&
              item?.highlight !== undefined &&
              item?.highlight !== null
                ? `inset 0 0 10px ${alpha(
                    item?.highlight?.colorCode ?? "#00000000",
                    0.6
                  )}`
                : "none",
            // borderBottom: "0.5px dotted #000",
            // borderRadius: "8px",
            // border: "2px",
            // position: "relative",
            // overflow: "hidden",
          }}
          showAnimation={
            item?.highlight !== undefined &&
            item?.highlight !== null &&
            item?.highlightEnabled
          }
        >
          {item?.category !== undefined && (
            <Avatar
              sx={{
                width: 24,
                height: 24,
                ml: 0.5,
                mr: 0.5,
                background: item?.category?.colorCode,
              }}
              variant="rounded"
            >
              <Typography sx={{ fontSize: "8px" }}>
                {item?.category?.shortName}
              </Typography>
            </Avatar>
          )}
          <Tooltip
            title={showTooltip ? item.rowName : ""}
            arrow
            placement={position === "bottom" ? "left" : "right"}
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, position === "bottom" ? 35 : 0],
                    },
                  },
                ],
              },
              tooltip: {
                sx: {
                  fontSize: tooltipFontSize,
                  padding: "8px",
                  color: "#fff",
                },
              },
            }}
          >
            <Typography
              id={`${i}+${position}`}
              ref={textRef}
              variant="caption"
              sx={{
                color: item.rowType === "quandrantRow" ? "#000" : "#1565c0",
                width: position === "bottom" && item.rowName !== "" ? 320 : 320,
                minHeight: 30,
                fontSize: "11px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                lineHeight: 2.66,
                p: "0px 2px",
                textOverflow: "ellipsis",
                display: "inline-block",
              }}
            >
              {item.rowName}
            </Typography>
          </Tooltip>
          {isRowHovered && position === "bottom" && item.rowName !== "" && (
            <>
              <EditIcon
                onClick={(e) => {
                  e.stopPropagation();
                  actionIconHanlder(e, item, "edit");
                }}
                sx={{
                  fontSize: 14,
                  cursor: "pointer",
                  pr: "2px",
                  color: "#1976d2",
                }}
              />
              <DeleteIcon
                onClick={(e) => {
                  e.stopPropagation();
                  actionIconHanlder(e, item, "delete");
                }}
                sx={{
                  fontSize: 14,
                  cursor: "pointer",
                  pr: "2px",
                  color: "red",
                }}
              />
            </>
          )}

          {item?.highlightEnabled &&
            item?.highlight !== undefined &&
            item?.highlight !== null && (
              <Avatar
                sx={{
                  width: 18,
                  height: 18,
                  ml: 0.5,
                  mr: 0.5,
                  background: "red",
                  cursor: "pointer",
                }}
                variant="rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowHighlightResetModal(item);
                }}
              >
                <PriorityHigh style={{ fontSize: 12 }} />
              </Avatar>
            )}
        </AnimatedBorderBox>
      </Box>

      {showHighlightResetModal !== null && (
        <CustomDialog maxWidth="xs" open={true} title={"Confirmation Modal"}>
          <Box sx={{ p: 1 }}>
            <Typography variant="body1">
              Do you want to reset the highlight?
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 1,
                gap: 1,
              }}
            >
              <Button
                size="small"
                fullWidth
                color="primary"
                onClick={handleResetHighlightModal}
                sx={{ textTransform: "capitalize" }}
                variant="contained"
              >
                Yes
              </Button>
              <Button
                size="small"
                fullWidth
                color="error"
                onClick={() => setShowHighlightResetModal(null)}
                sx={{ textTransform: "capitalize" }}
                variant="contained"
              >
                No
              </Button>
            </Box>
          </Box>
        </CustomDialog>
      )}
    </>
  );
};

const TriangleBox = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const globalData = useSelector((state) => state.globalData.data);

  const dispatch = useDispatch();
  const [defaultPositions, setDefaultPositions] = useState([
    "top",
    "right",
    "bottom",
    "left",
  ]);
  const [hideLists, setHideLists] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [slotMapperList, setSlotMapperList] = useState(Object.values(MAPPING));
  const [addNewAnchorEl, setAddNewAnchorEl] = useState(null);
  const [rerender, setRerender] = useState(false);
  const [drillDownViewModal, setDrillDownViewModal] = useState({
    showModal: false,
    rowObj: null,
    modalTitle: "",
  });

  useEffect(() => {
    setData(globalData);
  }, [globalData, rerender]);

  const [tempVars, setTempVars] = useState({
    selectedRow: null,
    selectedCol: null,
    selectedPopoverValue: null,
  });
  const [editDeleteTempVars, setEditDeleteTempVars] = useState({
    editFlag: false,
    rowText: "",
    category: null,
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
    if (userName === "" || userName === null || userName === undefined) {
      navigate("/login");
      return;
    }
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
    dispatch(setGlobalData(data));
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
    globalData?.quadrants?.find((q) => q.quadrantPosition === pos);

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
        category: null,
        isOwnerAdding: false,
        rowText: "",
        action: "",
        rowObj: null,
        popoverTitle: "",
      };
    });
  };

  const handleRowClick = (item, position) => {
    const { quadrantName } = getQuadrant(position);
    if (
      position === "bottom" &&
      item?.highlight !== null &&
      item?.highlight !== undefined &&
      item?.highlightEnabled
    ) {
      setDrillDownViewModal(() => {
        return {
          modalTitle: "Drill Down View",
          rowObj: null,
          showModal: true,
        };
      });
      return;
    }
    if (
      position !== "bottom" &&
      item?.highlight !== null &&
      item?.highlight !== undefined &&
      item?.highlightEnabled
    ) {
      toast.error(
        `Please set \"${quadrantName}\" as the active quadrant to perform actions.`
      );
    }
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
        category: item.category,
        rowObj: item,
        popoverTitle: `${action === "delete" ? "Delete" : "Edit"} Row Item`,
      };
    });
  };

  const checkZoomLevelAndIncreasePopover = () => {
    const el = document.getElementById("centralsquare");
    if (!el) {
      return 1;
    }
    const computedStyle = window.getComputedStyle(el);
    const transform = computedStyle.transform;

    if (transform && transform !== "none") {
      const match = transform.match(/matrix\(([^)]+)\)/);
      if (match) {
        const values = match[1].split(", ");
        const scaleX = parseFloat(values[0]);
        const scaleY = parseFloat(values[3]);
        return scaleX;
      } else {
        return 1;
      }
    } else {
      return 1;
    }
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
    if (
      row?.rowType === "quandrantOwner" ||
      column?.rowType === "quandrantOwner"
    ) {
      setSlotMapperList((prev) => {
        return Object.values(MAPPING).filter((x) => x.value !== "RL");
      });
    } else {
      setSlotMapperList((prev) => {
        return Object.values(MAPPING).filter((x) => x.value === "RL");
      });
    }
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
    const {
      rowText,
      isOwnerAdding,
      category,
      editFlag,
      popoverTitle,
      rowObj,
      action,
    } = editDeleteTempVars;

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
      category: category,
    };

    setData((prev) => {
      const updatedQuads = prev?.quadrants?.map((quad) => {
        // Only update the bottom quadrant
        if (quad.quadrantPosition !== "bottom") return quad;
        let updatedRowItems;

        if (editFlag && rowObj) {
          // Edit mode: update rowName of the matching row
          updatedRowItems = quad.quadrantListItems.map((item) =>
            item.rowId === rowObj?.rowId
              ? { ...item, rowName: rowText, category }
              : item
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
      <ToastContainer />
      <QuadrantButtons
        emitSelectedRotation={rotateEntire}
        show={true}
        rerenderParent={() => setRerender((prev) => !prev)}
      />
      {/* <LegendComponent /> */}
      <LegendComponent />

      <Box
        key={rerender}
        sx={{
          height: "100vh",
          width: "100vw",
          overflow: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Box sx={{ height: "100%" }}> */}
          <Box
            id="centralsquare"
            sx={{
              display: "grid",
              gridTemplateAreas: `
            "top-left top top-right"
            "left center right"
            "bottom-left bottom bottom-right"
          `,
              gridTemplateColumns: "auto 320px auto",
              gridTemplateRows: "auto 320px auto",
              justifyItems: "center",
              alignItems: "center",
              m: 20,
              // height :"100%"
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
                width: "320px",
                opacity: !hideLists ? 1 : 0,
                transform: !hideLists ? "scale(1)" : "scale(0.95)",
                pointerEvents: !hideLists ? "auto" : "none",
                transition: "opacity 1.5s ease, transform 1.5s ease",
                background: "lightgray",
                //   ...margins.topright,
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              }}
            >
              {getQuadrant("top")?.quadrantListItems.map((item, i) => (
                <QuadrantListItem
                  item={item}
                  i={i}
                  position="top"
                  key={i}
                  rowClickHandler={(e) => handleRowClick(e, "top")}
                />
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
                width: `${getLength("right") * cellSize}px`,
                height: "320px",

                background: "lightgray",
                opacity: !hideLists ? 1 : 0,
                pointerEvents: !hideLists ? "auto" : "none",
                transition: "opacity 2s ease, transform 2s ease",
                // ...margins.rightList,
                borderTop: "0.5px dotted #000",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              }}
            >
              <Box sx={{ transform: "rotate(-90deg)" }}>
                {getQuadrant("right")?.quadrantListItems.map((item, i) => (
                  <QuadrantListItem
                    item={item}
                    i={i}
                    position="right"
                    key={i}
                    rowClickHandler={(e) => handleRowClick(e, "right")}
                  />
                ))}
              </Box>
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
                width: "320px",
                opacity: !hideLists ? 1 : 0,
                transform: !hideLists ? "scale(1)" : "scale(0.95)",
                pointerEvents: !hideLists ? "auto" : "none",
                transition: "opacity 2s ease, transform 2s ease",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                borderTop: "0.5px dotted #000",
              }}
            >
              {getQuadrant("bottom")?.quadrantListItems.map((item, i) => (
                <QuadrantListItem
                  item={item}
                  i={i}
                  position="bottom"
                  key={i}
                  actionIconHanlder={actionButtonClickHandler}
                  rowClickHandler={(e) => handleRowClick(e, "bottom")}
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
                        category: null,
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
                        category: null,
                        action: "new",
                        isOwnerAdding: true,
                        rowText: "",
                        rowObj: null,
                        popoverTitle: `Add Owner`,
                      };
                    });
                  }}
                >
                  {getQuadrant("bottom")?.quadrantListItems?.filter(
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
                width: `${getLength("left") * cellSize + 4}px`,
                height: "320px",
                position: "relative",
                right: "-38px",
                background: "lightGray",
                opacity: !hideLists ? 1 : 0,
                pointerEvents: !hideLists ? "auto" : "none",
                transition: "opacity 2s ease, transform 2s ease",
                // ...margins.leftList,
              }}
            >
              <Box sx={{ transform: "rotate(-90deg)" }}>
                {getQuadrant("left")?.quadrantListItems.map((item, i) => (
                  <QuadrantListItem
                    item={item}
                    i={i}
                    position="left"
                    key={i}
                    rowClickHandler={(e) => handleRowClick(e, "left")}
                  />
                ))}
              </Box>
            </Box>

            {/* Center square with triangles - dynamic colors */}
            <Box
              gridArea="center"
              sx={{
                width: 320,
                height: 320,
                position: "relative",
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              {data?.quadrants?.map((q, i) => {
                // Define clip paths for top, right, bottom, left
                const clipPaths = [
                  "polygon(0% 0%, 100% 0%, 50% 50%)", // top
                  "polygon(100% 0%, 100% 100%, 50% 50%)", // right
                  "polygon(100% 100%, 0% 100%, 50% 50%)", // bottom
                  "polygon(0% 100%, 0% 0%, 50% 50%)", // left
                ];

                // Approximate text positions for each triangle
                const textPositions = [
                  { top: "2%", left: "50%", transform: "translateX(-50%)" }, // top center
                  { top: "50%", right: "2%", transform: "translateY(-50%)" }, // right center
                  { bottom: "2%", left: "50%", transform: "translateX(-50%)" }, // bottom center
                  { top: "50%", left: "2%", transform: "translateY(-50%)" }, // left center
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
                      backgroundColor: alpha(q.quadrantColor, 0.6),
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
                        color: "#000",
                        pointerEvents: "none",
                        maxWidth: "100px",
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        backdropFilter: "blur(20px)",
                        padding: "2px 5px",
                        textAlign: "center",
                        fontSize:
                          q.basePosition === "bottom" ||
                          (q.quadrantPosition === "bottom" &&
                            q.basePosition === "")
                            ? "14px"
                            : "12px",
                        borderRadius: "8px",
                        opacity: !hideLists ? 1 : 0,
                        transition: !hideLists ? "opacity 2s linear" : "none",
                        boxShadow:
                          q.basePosition === "bottom" ||
                          (q.quadrantPosition === "bottom" &&
                            q.basePosition === "")
                            ? "0 0 20px 8px rgba(54, 56, 58, 0.7)"
                            : "none",
                        ...textPositions[index],
                        fontWeight:
                          q.basePosition === "bottom" ||
                          (q.quadrantPosition === "bottom" &&
                            q.basePosition === "")
                            ? "bold"
                            : "400",
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
                  // title={val}
                  sx={{
                    border: "0.5px dashed gray !important",
                    cursor: "pointer",
                  }}
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
                // ...margins.rightList,
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
                  // title={val}
                  sx={{
                    border: "0.5px dashed gray !important",
                    cursor: "pointer",
                  }}
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
                transform: showQuadrants.bottomLeft
                  ? "scale(1)"
                  : "scale(0.95)",
                pointerEvents: showQuadrants.bottomLeft ? "auto" : "none",
                transition: "opacity 2s ease-out, transform 2s ease-out",
                "& > div": gridCell,
              }}
            >
              {noOfBoxes("left", "bottom").map((val, i) => (
                <Box
                  key={i}
                  // title={val}
                  sx={{
                    border: "0.5px dashed gray !important",
                    cursor: "pointer",
                  }}
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
                // ...margins.topright, // consider renaming if reused here
                opacity: showQuadrants.bottomRight ? 1 : 0,
                transform: showQuadrants.bottomRight
                  ? "scale(1)"
                  : "scale(0.95)",
                pointerEvents: showQuadrants.bottomRight ? "auto" : "none",
                transition: "opacity 2s ease-out, transform 2s ease-out",
                "& > div": gridCell,
              }}
            >
              {noOfBoxes("bottom", "right").map((val, i) => (
                <Box
                  key={i}
                  // title={val}
                  sx={{
                    border: "0.5px dashed gray !important",
                    cursor: "pointer",
                  }}
                  onClick={(e) => showPlotMapperPopover(e, val)}
                >
                  {getNewIntersections("bottom", "right", val)}
                </Box>
              ))}
            </Box>
          </Box>
        {/* </Box> */}
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
        {slotMapperList.map((value, index) => (
          <Box
            key={index}
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

      {addNewAnchorEl !== null && (
        <CustomDialog
          maxWidth="xs"
          open={true}
          title={editDeleteTempVars?.popoverTitle}
          sx={{ transform: `scale(${checkZoomLevelAndIncreasePopover()})` }}
        >
          <Box sx={{ p: 1 }}>
            <Select
              disabled={editDeleteTempVars?.action === "delete"}
              size="small"
              fullWidth
              // sx={{ maxWidth: 180, sx={{ zIndex: 100000000001 }} }}
              sx={{ zIndex: "1000000000000002 !important", mb: 1 }}
              value={editDeleteTempVars?.category?.shortName}
              MenuProps={{
                PaperProps: {
                  sx: {
                    zIndex: "1000000000000002 !important",
                  },
                },
              }}
              onChange={(e) => {
                const newValue = e.target.value;
                const selectedOption = ALL_CATEGORIES.find(
                  (opt) => opt.shortName === newValue
                );
                setEditDeleteTempVars((prev) => {
                  return {
                    ...prev,
                    category: selectedOption,
                  };
                });
              }}
              displayEmpty
              renderValue={(selectedValue) =>
                selectedValue ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <span style={{ fontSize: "12px" }}>
                      {
                        ALL_CATEGORIES.find(
                          (opt) => opt.shortName === selectedValue
                        )?.label
                      }
                    </span>
                  </Box>
                ) : (
                  <span style={{ color: "#888", fontSize: "12px" }}>
                    Category
                  </span>
                )
              }
            >
              {ALL_CATEGORIES.map((option) => (
                <MenuItem key={option.shortName} value={option.shortName}>
                  <ListItemText
                    primary={option.label}
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: 12,
                        },
                      },
                    }}
                  />
                </MenuItem>
              ))}
            </Select>
            <TextField
              size="small"
              fullWidth
              placeholder="Enter here..."
              variant="outlined"
              sx={{
                minWidth: "320px",
                "& .MuiInputBase-input": {
                  fontSize: "13px",
                },
              }}
              multiline
              minRows={2}
              maxRows={3}
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

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
            >
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
        </CustomDialog>
      )}
      {drillDownViewModal?.showModal && (
        <CustomDialog
          maxWidth="xl"
          open={true}
          title={drillDownViewModal?.modalTitle}
        >
          <Box sx={{ p: 1, maxHeight: "80%", overflowY: "auto" }}>
            <img
              src={PerplexityFinance}
              alt="Perplexity Finance"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
            <Button
              size="small"
              color="error"
              onClick={() => {
                setDrillDownViewModal(() => {
                  return {
                    showModal: false,
                    modalTitle: "",
                    rowObj: null,
                  };
                });
              }}
              sx={{ ml: 1, textTransform: "capitalize" }}
              variant="contained"
            >
              Close
            </Button>
          </Box>
        </CustomDialog>
      )}
    </>
  );
};

export default TriangleBox;
