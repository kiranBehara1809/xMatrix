import { Check, Face, Face2 } from "@mui/icons-material";
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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ndgf from "../../assets/ndgf.png";
import { setGlobalData } from "../../redux/globalDataSlice";

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

const NewRelationModal = () => {
  const dispatch = useDispatch();
  const [loadRhs, setLoadRhs] = useState(false);
  const [lhs, setLhs] = useState(null);
  const globalData = useSelector((state) => state.globalData.data);
  const [tempData, setTempData] = useState(
    JSON.parse(JSON.stringify(globalData?.quadrants))
  );
  const [rhs, setRhs] = useState([]);

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
  }, [loadRhs]);

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

  const handleChipClick = (item) => {
    const newObj = { type: "RL", rowId: item.rowId };
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
  };

  const saveRelations = () => {
    const cloned = JSON.parse(JSON.stringify(globalData));
    const updatedQuadrants =
      cloned?.quadrants?.map((x) =>
        x.quadrantName === lhs.quadrantName ? lhs : x
      ) || [];
    const updatedGlobalData = { ...cloned, quadrants: updatedQuadrants };
    dispatch(setGlobalData(updatedGlobalData));
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
                    Target Quadrant
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
                maxHeight: "400px", // Limit height for scrollable list
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
                  <img src={ndgf} width={150} height={150} />
                </Box>
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
                    "&:hover": {
                      backgroundColor: "#e0f7fa",
                    },
                    transition: "background-color 0.2s",
                  }}
                >
                  <Checkbox
                    size="small"
                    checked={item.checked}
                    onChange={(e) =>
                      handleCheckboxChange(item, e.target.checked)
                    }
                    sx={{
                      padding: "4px",
                      "&.Mui-checked": {
                        color: "#1da9bb",
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
                      background: "#1da9bb",
                    }}
                    variant="rounded"
                  >
                    {item?.mappedCount ?? 0}
                  </Avatar>
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
                      minHeight: "450px",
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
                                clickable
                                sx={{
                                  fontSize: "11px",
                                  width: "auto",
                                  maxWidth: "410px",
                                  minWidth: "200px",
                                  border: getChipIcon(rowItem)
                                    ? "2px dashed #1da9bb"
                                    : "",
                                  background: alpha(
                                    COLORS[quadrantItem?.basePosition],
                                    0.1
                                  ),
                                  "&: hover": {
                                    background: "#1da9bb",
                                    color: "#fff",
                                  },
                                }}
                                onClick={() =>
                                  handleChipClick(rowItem, quadrantItem)
                                }
                                label={rowItem?.rowName}
                              />
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
        sx={{
          textTransform: "capitalize",
          position: "absolute",
          right: 90,
          bottom: 8,
        }}
        onClick={saveRelations}
      >
        Save Relations
      </Button>
    </>
  );
};

export default NewRelationModal;
