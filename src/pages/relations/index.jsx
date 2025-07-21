import { Box, Grid, ListItemText, MenuItem } from "@mui/material";
import React, { use, useState } from "react";
import { useSelector } from "react-redux";

const RelationModal = () => {
  const globalData = useSelector((state) => state.globalData.data);
  const quadrants = globalData?.quadrants || [];
  const [sectionA, setSectionA] = useState(null);
  const [sectionB, setSectionB] = useState(null);
  return (
    <Grid container spacing={2} sx={{ width: "100%" }}>
      <Grid item size={6}>
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
          }}
          displayEmpty
          renderValue={(selectedValue) =>
            selectedValue ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <span style={{ fontSize: "12px" }}>
                  {
                    quadrants.find((opt) => opt.quadrantName === selectedValue)
                      ?.quadrantName
                  }
                </span>
              </Box>
            ) : (
              <span style={{ color: "#888", fontSize: "12px" }}>Category</span>
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
      <Grid item size={6}>
        <Select
          size="small"
          fullWidth
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
              <span style={{ color: "#888", fontSize: "12px" }}>Category</span>
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
      </Grid>
    </Grid>
  );
};

export default RelationModal;
