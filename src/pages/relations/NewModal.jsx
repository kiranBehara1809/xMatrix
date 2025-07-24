import {
  Check,
  Circle,
  CircleOutlined,
  DoNotDisturb,
  Face,
  Face2,
} from "@mui/icons-material";
import {
  Box,
  Grid,
  ListItemText,
  MenuItem,
  Select,
  Checkbox,
  Typography,
  Avatar,
  Chip,
  alpha,
  Tooltip,
  Button,
  Popover,
  Divider,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ndgf from "../../assets/ndgf.png";
import { setGlobalData } from "../../redux/globalDataSlice";
import CustomDialog from "../components/CustomDialog";

const QUADRANT_ROW_COLOR = "#0ad1b7";
const QUADRANT_ROW_HOVER_COLOR = "#0ad1b745";
const QUADRANT_OWNER_COLOR = "#ad139d";
const QUADRANT_OWNER_HOVER_COLOR = "#ad139d63";
const COMBINATIONS = {
  top: ["right", "left"],
  bottom: ["left"],
  left: ["top", "bottom"],
  right: ["top"],
};

const COLORS = {
  top: "#2979ff",
  bottom: "#ff1744",
  left: "#01c666",
  right: "#ff9100",
};

const NewRelationModal = ({ setRelationshipModal }) => {
  const refs = useRef([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorPosition, setAnchorPosition] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const dispatch = useDispatch();
  const [loadRhs, setLoadRhs] = useState(false);
  const [lhs, setLhs] = useState(null);
  const globalData = useSelector((state) => state.globalData.data);
  const [selectedItem, setSelectedItem] = useState(null); // Track selected item
  const [selectionPromiseResolver, setSelectionPromiseResolver] =
    useState(null);
  const [relationSelector, setRelationSelector] = useState(null);
  const [tempData, setTempData] = useState(
    JSON.parse(JSON.stringify(globalData?.quadrants))
  );
  const [saveConfirmModal, setSaveConfirmModal] = useState(false);
  const [resetConfirmModal, setResetConfirmModal] = useState(false);
  const [switchingViewConfirmModal, setSwitchingViewConfirmModal] = useState({
    event: null,
    showModal: false,
  });
  const [rhs, setRhs] = useState([]);
  const [stateChanged, setStateChanged] = useState(false);
  const [relationModalStateChanged, setRelationModalStateChanged] =
    useState(false);

  useEffect(() => {
    if (!lhs || !loadRhs) {
      setRhs([]);
      return;
    }
    const rqi = COMBINATIONS[lhs?.basePosition];
    const arr = [];
    rqi?.forEach((item) => {
      const quadrant = globalData?.quadrants.find(
        (x) => x.basePosition === item
      );
      if (quadrant) {
        arr.push({
          ...quadrant,
          quadrantListItems: quadrant.quadrantListItems.map((x) => ({
            ...x,
            intersections:
              x?.intersections?.map((intersection) => {
                return {
                  ...intersection,
                  checked: x?.intersections?.some(
                    (i) => i.rowId === intersection.rowId
                  ),
                };
              }) ?? [],
            mappedCount: x?.intersections?.length ?? 0,
          })),
        });
      }
    });
    setRhs(arr);
  }, [loadRhs, globalData]);

  // Handler for checkbox selection (ensures single selection)
  const handleCheckboxChange = (item, checkboxCheckedVal) => {
    const updatedItems = lhs.quadrantListItems.map((x) => ({
      ...x,
      checked: x.rowId === item.rowId ? !x.checked : false,
      mappedCount: x?.intersections?.length ?? 0,
    }));
    setLhs({ ...lhs, quadrantListItems: updatedItems });
    if (!checkboxCheckedVal) {
      setRhs([]);
      setLoadRhs(false);
      return;
    }
    setLoadRhs(() => true);
  };

  const reloadLhs = () => {
    const selectedOption = globalData?.quadrants.find(
      (opt) => opt?.quadrantName === lhs.quadrantName
    );
    const items = selectedOption?.quadrantListItems?.map((x) => ({
      ...x,
      checked: false,
      mappedCount: x?.intersections?.length ?? 0,
    }));
    setLhs({ ...selectedOption, quadrantListItems: items });
    setRhs([]);
    setLoadRhs(false);
  };

  const handleChipClick = async (item, event) => {
    const activeRow = lhs?.quadrantListItems?.find((x) => x.checked);
    let selectedOption = "RL";
    if (activeRow?.rowType === "quandrantOwner") {
      selectedOption = await openPopover(item.rowId, event);
    }
    const newObj = { type: selectedOption, rowId: item.rowId };
    setLhs((prev) => ({
      ...prev,
      quadrantListItems: prev?.quadrantListItems?.map((x) => {
        if (!x.checked) {
          return {
            ...x,
            mappedCount: x?.intersections?.length ?? 0,
            intersections: x?.intersections ?? [],
          };
        }

        const rowIdExists = x?.intersections?.some(
          (intersection) => intersection.rowId === item.rowId
        );

        const newIntersections = rowIdExists
          ? x?.intersections.filter(
              (intersection) => intersection.rowId !== item.rowId
            )
          : [...(x?.intersections ?? []), newObj];

        return {
          ...x,
          mappedCount: newIntersections.length ?? 0,
          intersections: newIntersections,
        };
      }),
    }));
    setStateChanged(true);
  };

  const openPopover = (rowId, event) => {
    return new Promise((resolve) => {
      const rect = event?.currentTarget?.getBoundingClientRect();
      setAnchorPosition({
        top: rect.bottom + window.scrollY, // Position below the clicked element
        left: rect.left + window.scrollX, // Align with the left of the clicked element
      });
      setOpenIndex(rowId);
      setSelectionPromiseResolver(() => resolve); // Store resolver to use on selection
    });
  };

  const responsibilitySelector = (rowItem, option) => {
    setSelectedItem((prev) => {
      return {
        ...prev,
        [rowItem?.rowId]: option,
      };
    });
    if (selectionPromiseResolver) {
      selectionPromiseResolver(option);
    }
    closePopover();
  };

  const closePopover = () => {
    setAnchorPosition(null);
    setAnchorEl(null);
    setOpenIndex(null);
    setSelectionPromiseResolver(null);
    // setSelectedItem()
  };

  const resetAllRelations = () => {
    reloadLhs();
    setStateChanged(false);
    setSelectedItem(null);
    setResetConfirmModal(false);
  };

  const saveRelations = () => {
    const cloned = JSON.parse(JSON.stringify(globalData));
    const updatedQuadrants =
      cloned?.quadrants?.map((x) =>
        x.quadrantName === lhs.quadrantName ? lhs : x
      ) || [];
    const updatedGlobalData = { ...cloned, quadrants: updatedQuadrants };
    dispatch(setGlobalData(updatedGlobalData));
    setStateChanged(false);
    setSelectedItem(null);
    setSaveConfirmModal(false);
  };

  const getChipIcon = (rowItem) => {
    if (!lhs?.quadrantListItems || !rowItem?.rowId) {
      return false;
    }

    const activeRow = lhs?.quadrantListItems?.find((x) => x.checked);
    let icon = false;

    if (activeRow) {
      const intersectionFound = activeRow?.intersections?.find(
        (y) => y.rowId === rowItem?.rowId
      );
      if (intersectionFound) {
        icon = true;
      }
    }
    return icon;
  };

  return (
    <>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item size={4}>
          <Box>
            <Select
              size="small"
              fullWidth
              sx={{ zIndex: 1000, mb: 1 }}
              value={lhs?.quadrantName || ""}
              MenuProps={{ PaperProps: { sx: { zIndex: 1000 } } }}
              onChange={(e) => {
                // if (stateChanged) {
                //   setSwitchingViewConfirmModal({ event: e, showModal: true });
                //   return;
                // }
                const newValue = e.target.value;
                const selectedOption = globalData?.quadrants.find(
                  (opt) => opt?.quadrantName === newValue
                );
                const items = selectedOption?.quadrantListItems?.map((x) => ({
                  ...x,
                  checked: false,
                  mappedCount: x?.intersections?.length ?? 0,
                }));
                setLhs({ ...selectedOption, quadrantListItems: items });
                setLoadRhs(() => false);
                setRhs([]);
              }}
              displayEmpty
              renderValue={(selectedValue) =>
                selectedValue ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontSize: "12px" }}>
                      {selectedValue}
                    </Typography>
                  </Box>
                ) : (
                  <Typography sx={{ color: "#888", fontSize: "12px" }}>
                    Select Source Quandrant
                  </Typography>
                )
              }
            >
              {globalData?.quadrants.map((option) => (
                <MenuItem key={option.quadrantName} value={option.quadrantName}>
                  <ListItemText
                    primary={option.quadrantName}
                    slotProps={{
                      primary: { style: { fontSize: "12px" } },
                    }}
                  />
                </MenuItem>
              ))}
            </Select>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                maxHeight: "450px", // Limit height for scrollable list
                minHeight: "auto", // Limit height for scrollable list
                overflowY: "auto",
                border: "1px solid #e0e0e0",
                borderRadius: "4px",
                backgroundColor: "#f9f9f9",
              }}
            >
              {lhs === null && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img src={ndgf} width={200} height={200} />
                </Box>
              )}
              {lhs?.basePosition === "right" && (
                <Typography
                  variant="body2"
                  sx={{ pt: 1, pr: 1, pl: 1, fontWeight: "bold" }}
                >
                  Targets
                </Typography>
              )}
              {lhs?.quadrantListItems?.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    padding: "8px",
                    borderRadius: "4px",
                    pointerEvents: item?.rowName === "" && "none",
                    borderTop: item?.rowName === "" && "1.25px dashed #000",
                    cursor: "pointer",
                    // backgroundColor:
                    //   item?.rowType === "quandrantOwner" ? "#cbf9f3" : "",
                    "&:hover": {
                      backgroundColor:
                        item?.rowType === "quandrantOwner"
                          ? QUADRANT_OWNER_HOVER_COLOR
                          : QUADRANT_ROW_HOVER_COLOR,
                    },
                    transition: "background-color 0.2s",
                  }}
                  onClick={() => handleCheckboxChange(item, !item.checked)}
                >
                  {item?.rowName === "" && (
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      Owners
                    </Typography>
                  )}
                  {item?.rowName !== "" && (
                    <>
                      <Checkbox
                        size="small"
                        disabled={item.rowName === ""}
                        checked={item.checked}
                        onChange={(e) =>
                          handleCheckboxChange(item, e.target.checked)
                        }
                        sx={{
                          padding: "1px",
                          "&.Mui-checked": {
                            color:
                              item?.rowType === "quandrantOwner"
                                ? QUADRANT_OWNER_COLOR
                                : QUADRANT_ROW_COLOR,
                          },
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "12px",
                        }}
                      >
                        {item.rowName}
                        {/* {JSON.stringify(item)} */}
                      </Typography>
                      <span style={{ flex: 1 }}></span>
                      <Avatar
                        sx={{
                          width: 20,
                          height: 20,
                          fontSize: "12px",
                          background:
                            item?.rowType === "quandrantOwner"
                              ? QUADRANT_OWNER_COLOR
                              : QUADRANT_ROW_COLOR,
                        }}
                        variant="rounded"
                      >
                        {item?.mappedCount ?? 0}
                      </Avatar>
                    </>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid item size={8}>
          {loadRhs && lhs !== null && (
            <Grid container spacing={2}>
              {rhs?.map((quadrantItem, index) => {
                return (
                  <Grid
                    key={crypto.randomUUID()}
                    item
                    size={rhs?.length === 1 ? 12 : 6}
                    sx={{
                      border: "1px dashed gray",
                      borderRadius: 1,
                      p: 1,
                      minHeight: "490px",
                      marginBottom: "20px",
                    }}
                  >
                    <Box
                      sx={{
                        mt: "-19px",
                        ml: 1,
                        p: "0px 8px",
                        background: "#fff",
                        width: "fit-content",
                        fontSize: "13px",
                      }}
                    >
                      {quadrantItem?.quadrantName}
                    </Box>
                    <Box
                      sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}
                    >
                      {quadrantItem?.quadrantListItems?.map(
                        (rowItem, itemIndex) => {
                          if (rowItem?.rowName === "") {
                            return null;
                          }
                          return (
                            <Tooltip
                              key={crypto.randomUUID()}
                              title={
                                rowItem?.rowName?.length > 50
                                  ? rowItem?.rowName
                                  : ""
                              }
                              arrow
                            >
                              <Chip
                                ref={(el) => (refs.current[rowItem.rowId] = el)}
                                clickable
                                sx={{
                                  fontSize: "11px",
                                  width: "auto",
                                  maxWidth: "410px",
                                  minWidth: "200px",
                                  border: getChipIcon(rowItem)
                                    ? "2px dashed #1da9bb"
                                    : "",
                                  // border: getChipIcon(rowItem)
                                  //   ? `2px dashed ${
                                  //       rowItem?.rowType === "quandrantOwner"
                                  //         ? QUADRANT_OWNER_COLOR
                                  //         : QUADRANT_ROW_COLOR
                                  //     }`
                                  //   : "",
                                  background: alpha(
                                    COLORS[quadrantItem?.basePosition],
                                    0.1
                                  ),
                                  "&: hover": {
                                    background: "#1da9bb",
                                    color: "#fff",
                                  },
                                }}
                                onClick={(e) => handleChipClick(rowItem, e)}
                                label={
                                  (selectedItem?.[rowItem?.rowId] !==
                                    undefined &&
                                  selectedItem?.[rowItem?.rowId] !== ""
                                    ? `(${selectedItem?.[rowItem?.rowId]})  `
                                    : "") + rowItem?.rowName
                                }
                              />
                              <Popover
                                open={
                                  openIndex === rowItem?.rowId &&
                                  Boolean(anchorPosition)
                                }
                                anchorReference="anchorPosition"
                                anchorPosition={anchorPosition}
                                onClose={() => closePopover()}
                                anchorOrigin={{
                                  vertical: "top",
                                  horizontal: "left",
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "left",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                  }}
                                >
                                  <Box
                                    sx={{
                                      cursor: "pointer",
                                      width: "100%",
                                      fontSize: "12px",
                                      padding: "8px 8px 0px 8px",
                                    }}
                                    onClick={() =>
                                      responsibilitySelector(rowItem, "PR")
                                    }
                                  >
                                    <CircleOutlined
                                      sx={{
                                        width: 8,
                                        height: 8,
                                        pr: 2,
                                      }}
                                    />
                                    Primary Responsibility
                                  </Box>
                                  <Divider />
                                  <Box
                                    sx={{
                                      cursor: "pointer",
                                      width: "100%",
                                      fontSize: "12px",
                                      padding: "0px 8px 0px 8px",
                                    }}
                                    onClick={() =>
                                      responsibilitySelector(rowItem, "SR")
                                    }
                                  >
                                    <Circle
                                      sx={{
                                        width: 8,
                                        height: 8,
                                        pr: 2,
                                        color: "gray",
                                      }}
                                    />
                                    Secondary Responsibility
                                  </Box>
                                  <Divider />
                                  <Box
                                    sx={{
                                      cursor: "pointer",
                                      width: "100%",
                                      fontSize: "12px",
                                      padding: "0px 8px 8px 8px",
                                    }}
                                    onClick={() =>
                                      responsibilitySelector(rowItem, "")
                                    }
                                  >
                                    <DoNotDisturb
                                      sx={{
                                        width: 8,
                                        height: 8,
                                        pr: 2,
                                      }}
                                    />
                                    Clear
                                  </Box>
                                </Box>
                              </Popover>
                            </Tooltip>
                          );
                        }
                      )}
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Grid>
      </Grid>
      <Typography
        sx={{
          color: "red",
          fontSize: "11px",
          position: "absolute",
          left: 16,
          bottom: 10,
        }}
      >
        Please save your changes.
      </Typography>
      <Button
        size="small"
        variant="contained"
        disabled={!stateChanged || !rhs?.length}
        sx={{
          textTransform: "capitalize",
          position: "absolute",
          right: 80,
          bottom: 8,
        }}
        onClick={() => setResetConfirmModal(true)}
      >
        Reset
      </Button>
      <Button
        size="small"
        variant="contained"
        disabled={!stateChanged || !rhs?.length}
        sx={{
          textTransform: "capitalize",
          position: "absolute",
          right: 150,
          bottom: 8,
        }}
        onClick={() => setSaveConfirmModal(true)}
      >
        Save
      </Button>
      <Button
        size="small"
        variant="contained"
        sx={{
          textTransform: "capitalize",
          position: "absolute",
          right: 10,
          bottom: 8,
        }}
        onClick={() => {
          if (stateChanged) {
            setRelationModalStateChanged((prev) => true);
          } else {
            setRelationshipModal((prev) => {
              return { ...prev, showModal: false };
            });
          }
        }}
      >
        Close
      </Button>

      {saveConfirmModal && (
        <CustomDialog
          open={true}
          onClose={() => {
            setSaveConfirmModal(() => false);
          }}
          title={null}
          maxWidth="xs"
          sx={{ zIndex: 100000000000 }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Are you sure you want to save the associated relations?
            </Typography>
            <Typography variant="body2">
              Please review once more before proceeding
            </Typography>
            <Box
              sx={{
                mt: 2,
                gap: 1,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="contained"
                sx={{ background: "green", textTransform: "capitalize" }}
                fullWidth
                onClick={saveRelations}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                sx={{ textTransform: "capitalize" }}
                fullWidth
                onClick={() => setSaveConfirmModal(false)}
              >
                No
              </Button>
            </Box>
          </Box>
        </CustomDialog>
      )}

      {resetConfirmModal && (
        <CustomDialog
          open={true}
          onClose={() => {
            setSaveConfirmModal(() => false);
          }}
          title={null}
          maxWidth="xs"
          sx={{ zIndex: 100000000000 }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              This will remove all relationships set against all quadrants.
            </Typography>
            <Typography variant="body2">
              Are you sure you want to reset all relationships and start afresh?
            </Typography>
            <Box
              sx={{
                mt: 2,
                gap: 1,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="contained"
                sx={{ background: "green", textTransform: "capitalize" }}
                fullWidth
                onClick={resetAllRelations}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                sx={{ textTransform: "capitalize" }}
                fullWidth
                onClick={() => setResetConfirmModal(false)}
              >
                No
              </Button>
            </Box>
          </Box>
        </CustomDialog>
      )}

      {switchingViewConfirmModal.showModal && (
        <CustomDialog
          open={true}
          onClose={() => {
            setSwitchingViewConfirmModal(() => {
              return { event: null, showModal: false };
            });
          }}
          title={null}
          maxWidth="xs"
          sx={{ zIndex: 100000000000 }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              You have unsaved relationship changes. Moving away will reset the
              changes you have made right now.
            </Typography>
            <Typography variant="body2">
              Are you sure you want to move away?
            </Typography>
            <Box
              sx={{
                mt: 2,
                gap: 1,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="contained"
                sx={{ background: "green", textTransform: "capitalize" }}
                fullWidth
                onClick={resetAllRelations}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                sx={{ textTransform: "capitalize" }}
                fullWidth
                onClick={() =>
                  setSwitchingViewConfirmModal(() => {
                    return { event: null, showModal: false };
                  })
                }
              >
                No
              </Button>
            </Box>
          </Box>
        </CustomDialog>
      )}

      {relationModalStateChanged && (
        <CustomDialog
          open={true}
          onClose={() => {
            setRelationModalStateChanged(false);
          }}
          title={null}
          maxWidth="xs"
          sx={{ zIndex: 100000000000 }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              You have unsaved relationship changes. Closing will reset the
              changes you have made right now.
            </Typography>
            <Typography variant="body2">
              Are you sure you want to close?
            </Typography>
            <Box
              sx={{
                mt: 2,
                gap: 1,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="contained"
                sx={{ background: "green", textTransform: "capitalize" }}
                fullWidth
                onClick={() => {
                  setRelationModalStateChanged(false);
                  setRelationshipModal((prev) => {
                    return { ...prev, showModal: false };
                  });
                }}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                sx={{ textTransform: "capitalize" }}
                fullWidth
                onClick={() => setRelationModalStateChanged(false)}
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

export default NewRelationModal;
