import { Circle, Inbox } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography,
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

const RelationModal = ({ closeModal = () => {} }) => {
  const dispatch = useDispatch();
  const globalData = useSelector((state) => state.globalData.data);
  const [tempData, setTempData] = useState(
    JSON.parse(JSON.stringify(globalData?.quadrants))
  );
  const quadrants = globalData?.quadrants || [];
  const [sectionA, setSectionA] = useState(null);
  const [sectionB, setSectionB] = useState(null);
  const [newRelations, setNewRelations] = useState({});
  const [sectionBOptions, setSectionBOptions] = useState([]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setSectionB(null);
      setSectionA(null);
      setSectionBOptions([]);
      setNewRelations({});
    };
  }, []);

  // Update sectionBOptions when sectionA changes
  useEffect(() => {
    if (sectionA !== null && sectionB === null) {
      const sectionBOptions = quadrants?.filter(
        (x) =>
          x.quadrantName !== sectionA?.quadrantName &&
          COMBINATIONS[sectionA?.quadrantPosition]?.includes(x.basePosition)
      );
      setSectionBOptions(sectionBOptions ?? []);
    }
  }, [sectionA, quadrants]);

  // Initialize newRelations when sectionB is selected
  useEffect(() => {
    if (sectionB) {
      const initialRelations = {};
      sectionB.quadrantListItems.forEach((item) => {
        initialRelations[item.rowId] = getExistingRelations(
          sectionB.quadrantName,
          item
        );
      });
      setNewRelations(initialRelations);
    }
  }, [sectionB, tempData]);

  const handleRelationChange = (quadrant, item, relations) => {
    const quadrantObj = tempData?.find((x) => x.quadrantName === quadrant);
    if (quadrantObj) {
      const finalRelations =
        relations?.map((x) => {
          return { ...x, type: "RL" };
        }) || [];
      const updatedQuadrant = {
        ...quadrantObj,
        quadrantListItems: quadrantObj.quadrantListItems.map((row) => {
          if (row.rowId === item.rowId) {
            return {
              ...row,
              intersections: [
                ...new Set([...finalRelations, ...(row.intersections || [])]),
              ],
            };
          }
          return row;
        }),
      };
      const updatedData = tempData?.map((q) =>
        q.quadrantName === quadrant ? updatedQuadrant : q
      );
      setTempData(updatedData);
    }
  };

  const getExistingRelations = (quadrant, item) => {
    const quadrantObj = tempData?.find((x) => x.quadrantName === quadrant);
    if (quadrantObj) {
      const row = quadrantObj.quadrantListItems.find(
        (row) => row.rowId === item.rowId
      );
      return row ? row.intersections || [] : [];
    }
    return [];
  };

  const saveRelations = () => {
    if (tempData !== null) {
      dispatch(setGlobalData({ quadrants: tempData }));
      closeModal();
    }
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ width: "100%", alignItems: "flex-end" }}
      >
        <Grid item size={5}>
          <Select
            size="small"
            fullWidth
            sx={{ zIndex: 1000, mb: 1 }}
            value={sectionA?.quadrantName || ""}
            MenuProps={{ PaperProps: { sx: { zIndex: 1000 } } }}
            onChange={(e) => {
              const newValue = e.target.value;
              const selectedOption = quadrants.find(
                (opt) => opt?.quadrantName === newValue
              );
              setSectionA(selectedOption);
              setSectionB(null);
              setNewRelations({});
            }}
            displayEmpty
            renderValue={(selectedValue) =>
              selectedValue ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span style={{ fontSize: "12px" }}>{selectedValue}</span>
                </Box>
              ) : (
                <span style={{ color: "#888", fontSize: "12px" }}>
                  Target Quadrant
                </span>
              )
            }
          >
            {quadrants.map((option) => (
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
        </Grid>
        <Grid
          item
          size={2}
          sx={{ display: "flex", justifyContent: "center", pb: 1 }}
        >
          <Box
            sx={{
              p: "8px 16px",
              borderRadius: 1,
              border: "1px solid grey",
              fontSize: "13px",
            }}
          >
            Relation Mapping
          </Box>
        </Grid>
        <Grid item size={5}>
          <Select
            size="small"
            fullWidth
            sx={{ zIndex: 1000, mb: 1 }}
            value={sectionB?.quadrantName || ""}
            MenuProps={{ PaperProps: { sx: { zIndex: 1000 } } }}
            onChange={(e) => {
              const newValue = e.target.value;
              const selectedOption = sectionBOptions.find(
                (opt) => opt?.quadrantName === newValue
              );
              setSectionB(selectedOption);
            }}
            displayEmpty
            renderValue={(selectedValue) =>
              selectedValue ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span style={{ fontSize: "12px" }}>{selectedValue}</span>
                </Box>
              ) : (
                <span style={{ color: "#888", fontSize: "12px" }}>
                  Source Quadrant
                </span>
              )
            }
          >
            {sectionBOptions?.map((option) => (
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
        </Grid>
      </Grid>
      {sectionA === null ||
        (sectionB === null && (
          <Grid container spacing={2} sx={{ width: "100%" }}>
            <Grid
              item
              size={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <img src={ndgf} alt="No Data Found" width={100} height={100} />
            </Grid>
            <Grid
              item
              size={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <img src={ndgf} alt="No Data Found" width={100} height={100} />
            </Grid>
          </Grid>
        ))}
      {sectionA !== null && sectionB !== null && (
        <Grid
          container
          spacing={2}
          sx={{ width: "100%", alignItems: "flex-start" }}
        >
          <Grid item size={5}>
            <List>
              {sectionA?.quadrantListItems?.map((item) => (
                <ListItem disablePadding key={item.rowId}>
                  <ListItemButton disabled={!item?.rowName}>
                    <ListItemIcon>
                      <Avatar
                        sx={{
                          width: 24,
                          height: 24,
                          background: sectionA?.quadrantColor,
                        }}
                        variant="rounded"
                      >
                        <Typography sx={{ fontSize: "8px" }}>
                          {item?.rowType === "quandrantRow" ? "QR" : "QO"}
                        </Typography>
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={item?.rowName}
                      slotProps={{
                        primary: { style: { fontSize: "12px" } },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item size={7}>
            <List>
              {sectionB?.quadrantListItems?.map((item) => (
                <Box
                  key={item.rowId}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Select
                    multiple
                    size="small"
                    fullWidth
                    disabled={!item?.rowName}
                    sx={{
                      zIndex: 1000,
                      maxHeight: 25,
                      maxWidth: 200,
                      mb: "-0.5px",
                    }}
                    value={newRelations[item.rowId] || []}
                    MenuProps={{ PaperProps: { sx: { zIndex: 1000 } } }}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setNewRelations((prev) => {
                        const updated = { ...prev, [item.rowId]: newValue };
                        handleRelationChange(
                          sectionB?.quadrantName,
                          item,
                          newValue
                        );
                        return updated;
                      });
                    }}
                    renderValue={(selected) => {
                      if (!selected.length) {
                        return (
                          <span style={{ color: "#888", fontSize: "12px" }}>
                            Relation Mapping
                          </span>
                        );
                      }
                      const names = selected
                        .map(
                          (rowId) =>
                            sectionA?.quadrantListItems?.find(
                              (opt) => opt.rowId === rowId
                            )?.rowName
                        )
                        .filter(Boolean)
                        .join(", ");
                      return (
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <span style={{ fontSize: "12px" }}>{names}</span>
                        </Box>
                      );
                    }}
                  >
                    {sectionA?.quadrantListItems?.map((aItem) => (
                      <MenuItem key={aItem.rowId} value={aItem.rowId}>
                        <Avatar
                          sx={{
                            width: 18,
                            height: 18,
                            mr: 1,
                            background: sectionA?.quadrantColor,
                          }}
                          variant="rounded"
                        >
                          <Typography sx={{ fontSize: "8px" }}>
                            {aItem?.rowType === "quandrantRow" ? "QR" : "QO"}
                          </Typography>
                        </Avatar>
                        <ListItemText
                          primary={aItem.rowName}
                          slotProps={{
                            primary: { style: { fontSize: "12px" } },
                          }}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                  <ListItem disablePadding>
                    <ListItemButton disabled={!item?.rowName}>
                      <ListItemIcon>
                        <Avatar
                          sx={{
                            width: 24,
                            height: 24,
                            background: sectionB?.quadrantColor,
                          }}
                          variant="rounded"
                        >
                          <Typography sx={{ fontSize: "8px" }}>
                            {item?.rowType === "quandrantRow" ? "QR" : "QO"}
                          </Typography>
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={item?.rowName}
                        slotProps={{
                          primary: { style: { fontSize: "12px" } },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Box>
              ))}
            </List>
          </Grid>
        </Grid>
      )}
      {sectionA !== null && sectionB !== null && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            mt: 2,
          }}
        >
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
        </Box>
      )}
    </>
  );
};

export default RelationModal;
