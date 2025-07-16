import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Box,
  Button,
  Link,
  ListItemText,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import { Redo, Undo, Add, Remove } from "@mui/icons-material";
import IosSwitchDemo from "./components/IosSwitch";
import { ALL_CATEGORIES } from "../db/quadrantsReConstant";

// Sample Categories (replace with your real ALL_CATEGORIES)

const QuadrantButtons = ({ emitSelectedRotation = () => {}, show }) => {
  const [currentZoom, setCurrentZoom] = useState(1);
  const [selected, setSelected] = useState("");

  const ZOOM_STEP = 0.05;
  const MAX_ZOOM = 1.5;
  const MIN_ZOOM = 1;

  const zoom = (direction = "out", resetFlag = false) => {
    const el = document.getElementById("centralsquare");
    if (!el) return;

    let newZoom =
      direction === "in"
        ? Math.min(currentZoom + ZOOM_STEP, MAX_ZOOM)
        : Math.max(currentZoom - ZOOM_STEP, MIN_ZOOM);

    if (resetFlag) {
      newZoom = 1;
    }

    newZoom = Math.round(newZoom * 100) / 100;
    setCurrentZoom(newZoom);

    el.style.transform = `scale(${newZoom})`;
    el.style.transition = "transform 0.6s ease-in-out";
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "8px",
    padding: "8px",
    position: "absolute",
    borderRadius: "12px",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
    background: "#fff",
  };

  return (
    <>
      {/* External Event Toggle */}
      <div
        style={{
          ...containerStyle,
          bottom: "390px",
          right: "10px",
          paddingBottom: "16px",
        }}
      >
        <span
          style={{
            fontSize: "13px",
            color: "#000",
            width: "160px",
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          <strong>External Event Simulator</strong>
        </span>
        <Box
          sx={{
            width: 200,
            display: "flex",
            justifyContent: "center",
            color: "#000",
          }}
        >
          <IosSwitchDemo />
        </Box>
      </div>

      {/* Filter Category */}
      <div
        style={{
          ...containerStyle,
          bottom: "240px",
          right: "10px",
          paddingBottom: "16px",
        }}
      >
        <span
          style={{
            fontSize: "13px",
            color: "#000",
            width: "130px",
            textAlign: "center",
          }}
        >
          <strong>Filter Category</strong>
        </span>
        <Box
          sx={{
            width: 200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Select
            size="small"
            fullWidth
            sx={{ maxWidth: 180 }}
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            displayEmpty
            renderValue={(selectedValue) => {
              const selectedOption = ALL_CATEGORIES.find(
                (opt) => opt.shortName === selectedValue
              );
              return selectedOption ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span style={{ fontSize: "12px" }}>
                    {selectedOption.label}
                  </span>
                </Box>
              ) : (
                <span style={{ color: "#888", fontSize: "12px" }}>
                  Category
                </span>
              );
            }}
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
          <Box
            sx={{
              display: "flex",
              gap: "5px",
              mt: 1,
              justifyContent: "space-between",
              maxWidth: 180,
            }}
          >
            <Button
              size="small"
              fullWidth
              variant="contained"
              sx={{ textTransform: "capitalize" }}
            >
              Apply
            </Button>
            <Button
              size="small"
              fullWidth
              variant="contained"
              sx={{ textTransform: "capitalize" }}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </div>

      {/* Zoom Controls */}
      <div
        style={{
          ...containerStyle,
          bottom: "140px",
          paddingBottom: "16px",
          right: "10px",
        }}
      >
        <span
          style={{
            fontSize: "13px",
            color: "#000",
            width: "200px",
            textAlign: "center",
          }}
        >
          <strong>Zoom</strong> ({currentZoom}x){" "}
          <Link sx={{ cursor: "pointer" }} onClick={() => zoom("in", true)}>
            Reset
          </Link>
        </span>
        <Box sx={{ display: "flex", gap: "5px" }}>
          <Tooltip title="Zoom-out" placement="bottom" arrow>
            <Button
              disabled={currentZoom === MIN_ZOOM}
              variant="contained"
              onClick={() => zoom("out")}
              size="small"
            >
              <Remove />
            </Button>
          </Tooltip>
          <Tooltip title="Zoom-in" placement="bottom" arrow>
            <Button
              disabled={currentZoom === MAX_ZOOM}
              variant="contained"
              onClick={() => zoom("in")}
              size="small"
            >
              <Add />
            </Button>
          </Tooltip>
        </Box>
      </div>

      {/* Rotate Controls */}
      <div
        style={{
          ...containerStyle,
          bottom: "40px",
          right: "10px",
          paddingBottom: "16px",
        }}
      >
        <span
          style={{
            fontSize: "13px",
            color: "#000",
            width: "200px",
            textAlign: "center",
          }}
        >
          <strong>Change Orientation</strong>
        </span>
        <Box sx={{ display: "flex", gap: "5px" }}>
          <Tooltip title="Rotate Left" placement="bottom" arrow>
            <Button
              size="small"
              disabled={!show}
              variant="contained"
              onClick={() =>
                emitSelectedRotation({ index: 0, buttonClick: "PREVIOUS" })
              }
            >
              <Undo />
            </Button>
          </Tooltip>
          <Tooltip title="Rotate Right" placement="bottom" arrow>
            <Button
              size="small"
              disabled={!show}
              variant="contained"
              onClick={() =>
                emitSelectedRotation({ index: 0, buttonClick: "FORWARD" })
              }
            >
              <Redo />
            </Button>
          </Tooltip>
        </Box>
      </div>
    </>
  );
};

export default QuadrantButtons;
