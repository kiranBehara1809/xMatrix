import { Circle, Inbox } from "@mui/icons-material";
import {
  Avatar,
  Box,
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
import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ndgf from "../../assets/ndgf.png";

const COMBINATIONS = {
  top: ["right", "left"],
  bottom: ["left"],
  left: ["top", "bottom"],
  right: ["top"],
};

const RelationModal = () => {
  const dispatch = useDispatch();
  const globalData = useSelector((state) => state.globalData.data);
  const [tempData, setTempData] = useState(
    JSON.parse(JSON.stringify(globalData?.quadrants))
  );
  const quadrants = globalData?.quadrants || [];
  const [sectionA, setSectionA] = useState(null);
  const [sectionB, setSectionB] = useState(null);
  const [newRelations, setNewRelations] = useState([]);
  const [sectionBOptions, setSectionBOptions] = useState([]);

  useEffect(() => {
    return () => {
      setSectionB(null);
      setSectionA(null);
      setSectionBOptions([]);
    };
  }, []);

  useEffect(() => {
    if (sectionA !== null && sectionB === null) {
      const sectionBOptions = quadrants?.filter(
        (x) =>
          x.quadrantName !== sectionA?.quadrantName &&
          COMBINATIONS[sectionA?.quadrantPosition]?.includes(x.basePosition)
      );
      setSectionBOptions(sectionBOptions ?? []);
    }
  }, [sectionA]);

  const handleRelationChange = (quadrant, item, relations) => {
    const quadrantObj = tempData?.find((x) => x.quadrantName === quadrant);
    if (quadrantObj) {
      setNewRelations(relations);
      const updatedQuadrant = {
        ...quadrantObj,
        quadrantListItems: quadrantObj.quadrantListItems.map((row) => {
          if (row.rowId === item.rowId) {
            return {
              ...row,
              intersections: [
                ...new Set([...(row.intersections || []), ...relations]),
              ],
            };
          }
          return row;
        }),
      };
      const updatedData = tempData?.map((q) =>
        q.quadrantName === quadrant ? updatedQuadrant : q
      );
      // Dispatch the updated data to the store or handle it as needed
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
    if (updatedData !== null) {
      dispatch({ quadrants: tempData });
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
            sx={{ zIndex: "1000000000000002 !important", mb: 1 }}
            value={sectionA?.quadrantName}
            MenuProps={{
              PaperProps: {
                sx: {
                  zIndex: "1000000000000002 !important",
                },
              },
            }}
            onChange={(e) => {
              const newValue = e.target.value;
              const selectedOption = quadrants.find(
                (opt) => opt?.quadrantName === newValue
              );
              setSectionA(selectedOption);
              setSectionB(null);
            }}
            displayEmpty
            renderValue={(selectedValue) =>
              selectedValue ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span style={{ fontSize: "12px" }}>
                    {
                      quadrants.find(
                        (opt) => opt.quadrantName === selectedValue
                      )?.quadrantName
                    }
                  </span>
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
            sx={{ zIndex: "1000000000000002 !important", mb: 1 }}
            value={sectionB?.quadrantName}
            MenuProps={{
              PaperProps: {
                sx: {
                  zIndex: "1000000000000002 !important",
                },
              },
            }}
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
                  <span style={{ fontSize: "12px" }}>
                    {
                      sectionBOptions.find(
                        (opt) => opt.quadrantName === selectedValue
                      )?.quadrantName
                    }
                  </span>
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
        </Grid>
      </Grid>
      {sectionA === null ||
        (sectionB === null && (
          <>
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
          </>
        ))}
      {sectionA !== null && sectionB !== null && (
        <>
          <Grid
            container
            spacing={2}
            sx={{ width: "100%", alignItems: "flex-start" }}
          >
            <Grid item size={5}>
              <List>
                {sectionA?.quadrantListItems?.map((item, index) => {
                  return (
                    <ListItem disablePadding key={index}>
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
                            primary: {
                              sx: {
                                fontSize: 12,
                              },
                            },
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Grid>

            <Grid item size={7}>
              <List>
                {sectionB?.quadrantListItems?.map((item, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Select
                        multiple
                        size="small"
                        fullWidth
                        disabled={!item?.rowName}
                        sx={{
                          zIndex: "1000000000000002 !important",
                          maxHeight: 25,
                          maxWidth: 200,
                          mb: "-0.5px",
                        }}
                        value={newRelations}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              zIndex: "1000000000000002 !important",
                            },
                          },
                        }}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          //   const selectedOption = sectionBOptions.find(
                          //     (opt) => opt?.rowId === newValue
                          //   );
                          //   setNewRelations((prev) => {
                          //     const updatedRelations = [...prev];
                          //     updatedRelations[index] = {
                          //       ...updatedRelations[index],
                          //       rowId: newValue,
                          //     };
                          //     return updatedRelations;
                          //   });
                          let arr = [];
                          setNewRelations((prev) => {
                            arr = [...new Set([...prev, newValue])];
                            return arr;
                          });
                          handleRelationChange(
                            sectionB?.quadrantName,
                            item,
                            arr
                          );
                        }}
                        displayEmpty
                        renderValue={(selectedValue) => {
                          return selectedValue ? (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <span style={{ fontSize: "12px" }}>
                                {
                                  tempData
                                    ?.find(
                                      (y) =>
                                        y?.quadrantName ===
                                        sectionB?.quadrantName
                                    )
                                    ?.quadrantListItems?.find(
                                      (opt) => opt?.rowId === selectedValue
                                    )?.rowName
                                }
                              </span>
                            </Box>
                          ) : (
                            <span style={{ color: "#888", fontSize: "12px" }}>
                              Relation Mapping
                            </span>
                          );
                        }}
                      >
                        {sectionA?.quadrantListItems?.map((aItem) => (
                          <MenuItem
                            key={crypto.randomUUID()}
                            value={aItem.rowId}
                          >
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
                                {aItem?.rowType === "quandrantRow"
                                  ? "QR"
                                  : "QO"}
                              </Typography>
                            </Avatar>
                            <ListItemText
                              primary={aItem.rowName}
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
                              primary: {
                                sx: {
                                  fontSize: 12,
                                },
                              },
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    </Box>
                  );
                })}
              </List>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default RelationModal;
