import React, { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  alpha,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  MenuItem,
  Popover,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomDialog from "./components/CustomDialog";
import { useDispatch, useSelector } from "react-redux";
import { Delete, Edit, PriorityHigh, Warning } from "@mui/icons-material";
import { setGlobalData } from "../redux/globalDataSlice";
import ndgf from ".././assets/ndgf.png";
import { ALL_CATEGORIES } from "../db/quadrantsReConstant";
import { styled } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import RelationModal from "./relations";
import NewRelationModal from "./relations/NewModal";

const AnimatedBorderAvatar = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "inline-flex",
  "&::before": {
    content: '""',
    position: "absolute",
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: "8px",
    background: "linear-gradient(45deg, #f06, #48f, #0ff, #f06)",
    backgroundSize: "400%",
    animation: "borderAnimation 4s linear infinite",
    zIndex: -1,
  },
  "@keyframes borderAnimation": {
    "0%": {
      backgroundPosition: "0% 50%",
    },
    "100%": {
      backgroundPosition: "400% 50%",
    },
  },
}));

const BASE_COLOR_MAPPING = {
  "#ff1744": "Long-Term Objectives",
  "#01c666": "Annual Objectives",
  "#2979ff": "Top Level Improvements",
  "#ff9100": "Metrics to Improve",
};

const SlidePanel = () => {
  const dispatch = useDispatch();
  const globalData = useSelector((state) => state.globalData.data);
  const [selectedButton, setSelectedButton] = useState(null);
  const [localData, setLocalData] = useState(null);
  const [somethingEdited, setSomethingEdited] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [addNewAnchorEl, setAddNewAnchorEl] = useState(null);
  const [relationshipModal, setRelationshipModal] = useState({
    showModal: false,
    modalTitle: "Quadrant Relationship",
  });
  const [editDeleteTempVars, setEditDeleteTempVars] = useState({
    editFlag: false,
    rowText: "",
    rowObj: null,
    category: null,
    action: null,
    isOwnerAdding: false,
    popoverTitle: "",
    openModal: false,
  });

  useEffect(() => {
    if (!selectedButton) {
      setLocalData(null);
      return;
    }
    setLocalData((prev) =>
      globalData?.quadrants?.find((x) => x.quadrantName === selectedButton)
    );
    return () => {
      setLocalData(null);
      setSelectedButton(null);
    };
  }, [selectedButton]);

  const [isOpen, setIsOpen] = useState(false);

  const panelWidth = 200;
  const panelHeight = 300;

  const togglePanel = () => setIsOpen((prev) => !prev);

  const closeAddPopover = () => {
    // setAddNewAnchorEl(null);
    setEditDeleteTempVars((prev) => {
      return {
        ...prev,
        editFlag: false,
        isOwnerAdding: false,
        rowText: "",
        action: "",
        category: null,
        rowObj: null,
        popoverTitle: "",
        openModal: false,
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

  const handleButtonClick = (value) => {
    setSelectedButton(() => value);
    togglePanel();
  };

  const closeHandler = () => {
    setSelectedButton(null);
    setLocalData(null);
    setSomethingEdited(null);
    setShowWarning(false);
  };

  const cudRowHandler = () => {
    setSomethingEdited(null);
    const {
      rowText,
      isOwnerAdding,
      category,
      editFlag,
      popoverTitle,
      rowObj,
      action,
    } = editDeleteTempVars;

    if (category === null || category === undefined) {
      toast.error("Please select a category for the row.");
      return;
    }
    if (rowText === "" || rowText === undefined) {
      toast.error("Please enter some description.");
      return;
    }

    if (!rowText && action !== "clearAll") return;

    // Deep clone to avoid mutation
    const tempGlobalData = JSON.parse(JSON.stringify(globalData));

    // Find the quadrant where the action is to be applied
    let quadrant = tempGlobalData?.quadrants?.find(
      (q) => q.quadrantName === localData?.quadrantName
    );

    if (!quadrant || !Array.isArray(quadrant.quadrantListItems)) return;

    const listItems = quadrant.quadrantListItems;

    switch (action) {
      case "edit": {
        const item = listItems.find((item) => item.rowId === rowObj.rowId);
        if (item) {
          item.rowName = rowText;
          item.rowType = isOwnerAdding ? "quandrantOwner" : "quandrantRow";
          item.category = category ?? null;
        }
        break;
      }

      case "clearAll": {
        quadrant.quadrantListItems = [];
        break;
      }

      case "delete": {
        quadrant.quadrantListItems = listItems.filter(
          (item) => item.rowId !== rowObj.rowId
        );
        break;
      }

      case "add": {
        // Prevent duplicate rowId
        const exists = listItems.some((item) => item.rowId === rowObj?.rowId);
        if (!exists) {
          const newRowObj = {
            ...rowObj,
            rowId: crypto.randomUUID(),
            rowType: isOwnerAdding ? "quandrantOwner" : "quandrantRow",
            rowName: rowText,
            category,
          };

          // Use custom logic to decide where to insert the new row
          quadrant.quadrantListItems = latestRowItems(
            quadrant,
            newRowObj,
            isOwnerAdding
          );
        }
        break;
      }

      default:
        console.warn("Unknown action type:", action);
    }

    // Update global state and close things
    // dispatch(setGlobalData(tempGlobalData));
    setSomethingEdited(tempGlobalData);
    setLocalData((prev) =>
      tempGlobalData?.quadrants?.find((x) => x.quadrantName === selectedButton)
    );
    closeAddPopover();
    // closeHandler();
  };

  const applyAllHandler = () => {
    if (somethingEdited) {
      dispatch(setGlobalData(somethingEdited));
    }
    closeHandler();
  };

  const latestRowItems = (quad, newRowObj, isOwnerAdding) => {
    // if (quad.quadrantPosition !== "bottom") {
    //   return quad.quadrantListItems;
    // }

    const items = quad.quadrantListItems;

    if (quad.basePosition === "top" || quad.basePosition === "left") {
      return [...items, newRowObj];
    }

    if (quad.basePosition === "right") {
      return isOwnerAdding ? [...items, newRowObj] : [newRowObj, ...items];
    }

    if (quad.basePosition === "bottom") {
      return [...items, newRowObj];
    }

    return items;
  };

  const actionButtonClickHandler = (
    event,
    item,
    action,
    ownerBtnClick = false
  ) => {
    const userName = localStorage.getItem("userName");
    if (userName === "reader") {
      return;
    }
    // setAddNewAnchorEl(event.currentTarget);
    let actionLabel = action === "delete" ? "Delete" : "Edit";
    if (action === "add") {
      actionLabel = "Add";
    }
    const rowType = ownerBtnClick ? "Owner" : "Item";
    let popoverTitle = `${actionLabel} Row ${rowType}`;
    if (action === "clearAll") {
      popoverTitle = null;
    }

    setEditDeleteTempVars((prev) => {
      return {
        ...prev,
        editFlag: action === "edit",
        action: action,
        category: item?.category ?? null,
        isOwnerAdding: item?.rowType === "quandrantOwner" || ownerBtnClick,
        rowText: action === "add" ? "" : item?.rowName,
        rowObj: item ?? null,
        popoverTitle: popoverTitle,
        openModal: true,
      };
    });
  };

  const panelStyle = {
    position: "fixed",
    top: "25%",
    left: isOpen ? "0px" : `-${panelWidth + 40}px`,
    width: `${panelWidth}px`,
    height: `${panelHeight}px`,
    backgroundColor: "#ffffff",
    boxShadow: "2px 0 10px rgba(0, 0, 0, 0.3)",
    transition: "left 1s ease-in-out",
    padding: "20px",
    zIndex: 9999,
    borderRadius: "0 12px 12px 0",
    overflow: "hidden",
    color: "#000",
  };

  // Style for the container wrapping buttons — fades in/out with panel open state
  const buttonsContainerStyle = {
    opacity: isOpen ? 1 : 0,
    transition: "opacity 1s ease-in-out",
    pointerEvents: isOpen ? "auto" : "none", // Disable clicks when faded out
    marginTop: "10px",
  };

  const toggleButtonStyle = {
    position: "fixed",
    top: "32%",
    left: isOpen ? `${panelWidth + 40}px` : "0px",
    transition: "left 1s ease-in-out",
    zIndex: 999,
    padding: "8px",
    borderRadius: "0 8px 8px 0",
    border: "none",
    backgroundColor: "#0171bb",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
  };

  return (
    <>
      <ToastContainer />
      <div style={panelStyle}>
        <Typography sx={{ textAlign: "center" }} variant="body1">
          Quadrants
        </Typography>

        {/* Container with fade animation */}
        <div style={buttonsContainerStyle}>
          {Object.entries(BASE_COLOR_MAPPING).map(([key, value]) => (
            <Button
              onClick={() => handleButtonClick(value)}
              key={key}
              variant="contained"
              sx={{
                background: alpha(key, 0.7),
                m: "5px 0",
                textTransform: "capitalize",
              }}
              fullWidth
            >
              {value}
            </Button>
          ))}
        </div>
        <Divider sx={{ my: 1 }} />
        <Typography sx={{ textAlign: "center" }} variant="body1">
          Functions
        </Typography>
        <Button
          variant="contained"
          sx={{
            background:
              "linear-gradient(90deg,rgba(255, 23, 69, 0.7) 25%,rgba(1, 198, 103, 0.7) 25% 50%,rgba(41, 120, 255, 0.7) 50% 75%,rgba(255, 145, 0, 0.7) 75% 100%)",
            m: "5px 0",
            // fontWeight: "bold",
            textTransform: "capitalize",
          }}
          fullWidth
          onClick={() => {
            togglePanel();
            setRelationshipModal((prev) => ({ ...prev, showModal: true }));
          }}
        >
          Relationships
        </Button>
      </div>

      <Button
        variant="contained"
        onClick={togglePanel}
        style={toggleButtonStyle}
      >
        {isOpen ? <CloseIcon /> : <FilterAltIcon />}
      </Button>

      {showWarning && (
        <CustomDialog
          open={true}
          icon={
            <Warning
              sx={{
                color: "orange",
                width: "75px",
                height: "75px",
                fontSize: "75px",
              }}
            />
          }
          maxWidth={"xs"}
          sx={{ transform: `scale(${checkZoomLevelAndIncreasePopover()})` }}
        >
          <Box sx={{ p: 1 }}>
            <Typography>
              Are you sure, you want cancel all your changes?
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                mt: 1,
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="contained"
                size="small"
                sx={{ textTransform: "capitalize" }}
                onClick={() => {
                  closeHandler();
                  setShowWarning(false);
                }}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => setShowWarning(false)}
                sx={{ textTransform: "capitalize" }}
              >
                No
              </Button>
            </Box>
          </Box>
        </CustomDialog>
      )}

      {selectedButton !== null && (
        <>
          <CustomDialog
            open={true}
            title={localData?.quadrantName}
            maxWidth={"md"}
            sx={{ transform: `scale(${checkZoomLevelAndIncreasePopover()})` }}
          >
            <Box
              sx={{
                height: "auto",
                maxHeight: "450px",
                overflowY: "auto",
                overflowX: "hidden",
                p: "4px 8px",
              }}
            >
              {localData?.quadrantListItems?.length === 0 && (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={ndgf}
                      alt="No Data Found"
                      width={300}
                      height={300}
                    />
                  </Box>
                </>
              )}
              <List dense={false}>
                {["quandrantRow", "quandrantOwner"].map((type) => {
                  const filteredItems = localData?.quadrantListItems?.filter(
                    (item) => item.rowType === type
                  );
                  if (!filteredItems?.length) return null;

                  return (
                    <React.Fragment key={type}>
                      <ListSubheader
                        sx={{
                          bgcolor: "#1876d2",
                          mb: 2,
                          fontSize: "14px",
                          color: "#fff",
                          borderRadius: 2,
                        }}
                      >
                        {type === "quandrantOwner" ? "Owner" : "Items"}
                      </ListSubheader>
                      {filteredItems?.map((x) => (
                        <ListItem
                          key={x.rowId}
                          sx={{
                            boxShadow:
                              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                            mb: 1,
                            borderRadius: 4,
                            minHeight: 31,
                            height: 40,
                          }}
                          secondaryAction={
                            <>
                              <IconButton
                                disabled={x.rowName === ""}
                                edge="end"
                                aria-label="edit"
                                onClick={(e) => {
                                  actionButtonClickHandler(e, x, "edit");
                                }}
                              >
                                <Edit
                                  sx={{
                                    color:
                                      x.rowName === "" ? "gray" : "#1976d2",
                                    cursor:
                                      x.rowName === ""
                                        ? "not-allowed"
                                        : "pointer",
                                  }}
                                />
                              </IconButton>

                              <IconButton
                                disabled={x.rowName === ""}
                                edge="end"
                                aria-label="delete"
                                onClick={(e) => {
                                  actionButtonClickHandler(e, x, "delete");
                                }}
                              >
                                <Delete
                                  sx={{
                                    color: x.rowName === "" ? "gray" : "red",
                                    cursor:
                                      x.rowName === ""
                                        ? "not-allowed"
                                        : "pointer",
                                  }}
                                />
                              </IconButton>
                              {x?.highlightEnabled &&
                                x?.highlight !== undefined &&
                                x?.highlight !== null && (
                                  <IconButton edge="end" aria-label="delete">
                                    <AnimatedBorderAvatar>
                                      <Avatar
                                        variant="rounded"
                                        sx={{
                                          width: 20,
                                          height: 20,
                                          border: "2px solid transparent", // Ensures no default border interferes
                                          background: "#fff", // Background to prevent gradient bleed
                                        }}
                                      >
                                        <PriorityHigh
                                          style={{ fontSize: 20, color: "red" }}
                                        />
                                      </Avatar>
                                    </AnimatedBorderAvatar>
                                  </IconButton>
                                )}
                            </>
                          }
                        >
                          {x?.category !== undefined &&
                            x?.category !== null && (
                              <Avatar
                                sx={{
                                  width: 24,
                                  height: 24,
                                  mr: 1,
                                  background: x?.category?.colorCode,
                                }}
                                variant="rounded"
                              >
                                <Typography sx={{ fontSize: "8px" }}>
                                  {x?.category?.shortName}
                                </Typography>
                              </Avatar>
                            )}
                          <ListItemText
                            primary={x.rowName}
                            slotProps={{ primary: { fontSize: "13px", mr: 2 } }}
                          />
                        </ListItem>
                      ))}
                    </React.Fragment>
                  );
                })}
              </List>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                columnGap: 2,
                p: 1,
              }}
            >
              <Button
                variant="contained"
                size="small"
                sx={{ textTransform: "capitalize" }}
                onClick={(e) => actionButtonClickHandler(e, null, "add")}
              >
                Add New
              </Button>
              {localData?.quadrantName?.toLowerCase() ===
                "metrics to improve" && (
                <Button
                  variant="contained"
                  size="small"
                  sx={{ textTransform: "capitalize" }}
                  onClick={(e) =>
                    actionButtonClickHandler(e, null, "add", true)
                  }
                >
                  Add New Owner
                </Button>
              )}
              <Button
                variant="contained"
                size="small"
                sx={{ textTransform: "capitalize" }}
                onClick={(e) =>
                  actionButtonClickHandler(e, null, "clearAll", false)
                }
              >
                Clear All
              </Button>
              {somethingEdited && (
                <Button
                  variant="contained"
                  size="small"
                  sx={{ textTransform: "capitalize" }}
                  onClick={applyAllHandler}
                >
                  Apply All Changes
                </Button>
              )}

              <Button
                variant="contained"
                size="small"
                sx={{ textTransform: "capitalize" }}
                onClick={() => {
                  if (somethingEdited) {
                    setShowWarning(true);
                  } else {
                    closeHandler();
                  }
                }}
              >
                Close
              </Button>
            </Box>
          </CustomDialog>
        </>
      )}

      {editDeleteTempVars?.openModal && (
        <CustomDialog
          open={true}
          title={editDeleteTempVars?.popoverTitle}
          maxWidth={"xs"}
          sx={{ transform: `scale(${checkZoomLevelAndIncreasePopover()})` }}
        >
          <Box sx={{ pl: 1, pr: 1, pb: 1, pt: 1 }}>
            {editDeleteTempVars?.action === "clearAll" && (
              <Typography variant="body2">
                Are you sure, you want to clear all records?
              </Typography>
            )}
            {editDeleteTempVars?.action !== "clearAll" && (
              <>
                {!editDeleteTempVars?.isOwnerAdding && (
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
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
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
                )}
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
              </>
            )}

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
            >
              {editDeleteTempVars?.action === "delete" && (
                <Button
                  size="small"
                  fullWidth
                  onClick={cudRowHandler}
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
                  onClick={cudRowHandler}
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

      {relationshipModal?.showModal && (
        <CustomDialog
          maxWidth="xl"
          open={true}
          title={relationshipModal?.modalTitle}
        >
          <Box sx={{ p: 1, maxHeight: "80%", overflowY: "auto" }}>
            {/* <RelationModal
              closeModal={() => {
                setRelationshipModal((prev) => ({ ...prev, showModal: false }));
              }}
            /> */}
            <NewRelationModal />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
            <Button
              size="small"
              color="error"
              onClick={() => {
                setRelationshipModal(() => {
                  return {
                    showModal: false,
                    modalTitle: "Quadrant Relationship",
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

export default SlidePanel;
