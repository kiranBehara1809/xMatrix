import React, { use, useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Button, Link, Tooltip } from "@mui/material";
import { Redo, Undo, Add, Remove } from "@mui/icons-material";

const QuadrantButtons = ({ emitSelectedRotation = () => {}, show }) => {
  const [currentZoom, setCurrentZoom] = useState(1);

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "8px",
    padding: "8px",
    position: "absolute",
    bottom: "40px",
    right: "10px",
    borderRadius: "12px",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
  };

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

    // 🔁 Round to 2 decimal places to fix precision issue
    newZoom = Math.round(newZoom * 100) / 100;

    if (resetFlag) {
      newZoom = 1;
    }
    setCurrentZoom(newZoom);
    el.style.transform = `scale(${newZoom})`;
    el.style.transition = "transform 0.6s ease-in-out";
  };

  return (
    <>
      <div style={{ ...containerStyle, bottom: "170px" }}>
        <span
          style={{
            fontSize: "13px",
            color: "#000",
            whiteSpace: "break-spaces",
            width: "130px",
            textAlign: "center",
          }}
        >
          <strong>Zoom</strong> ({currentZoom}x){" "}
          <Link sx={{ cursor: "pointer" }} onClick={() => zoom("in", true)}>
            Reset
          </Link>
        </span>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "5px",
            p: 1,
            borderRadius: "8px",
          }}
        >
          <Tooltip title="Zoom-out" placement="bottom" arrow>
            <Button
              disabled={currentZoom === MIN_ZOOM}
              variant="contained"
              onClick={() => zoom("out")}
            >
              <Remove />
            </Button>
          </Tooltip>

          <Tooltip title="Rotate Right (Clockwise)" placement="bottom" arrow>
            <Button
              disabled={currentZoom === MAX_ZOOM}
              variant="contained"
              onClick={() => zoom("in")}
            >
              <Add />
            </Button>
          </Tooltip>
        </Box>
      </div>
      <div style={containerStyle}>
        <span
          style={{
            fontSize: "13px",
            color: "#000",
            whiteSpace: "break-spaces",
            width: "130px",
          }}
        >
          <strong>Change Orientation</strong>
        </span>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "5px",
            p: 1,
            borderRadius: "8px",
          }}
        >
          <Tooltip
            title="Rotate Left (Anti-clockwise)"
            placement="bottom"
            arrow
          >
            <Button
              disabled={!show}
              variant="contained"
              onClick={() =>
                emitSelectedRotation({ index: 0, buttonClick: "PREVIOUS" })
              }
            >
              <Undo />
            </Button>
          </Tooltip>

          <Tooltip title="Rotate Right (Clockwise)" placement="bottom" arrow>
            <Button
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
