import React, { useState } from "react";
import {
  Avatar,
  Box,
  Collapse,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { Circle, PanoramaFishEye } from "@mui/icons-material";
import { ALL_CATEGORIES } from "../db/quadrantsReConstant";
const MAPPING = {
  RL: {
    label: "Relationship",
    value: "RL",
    icon: (
      <Circle fontSize="small" style={{ fontSize: "10px", color: "#000" }} />
    ),
  },
  PR: {
    label: "Primary Responsibility",
    value: "PR",
    icon: (
      <PanoramaFishEye
        fontSize="small"
        style={{ fontSize: "10px", color: "#000" }}
      />
    ),
  }, // PRIMARY RESPONSIBILITY
  SR: {
    label: "Secondary Responsibility",
    value: "SR",
    icon: (
      <Circle
        fontSize="small"
        style={{ fontSize: "10px", color: "darkgray" }}
      />
    ),
  }, // SECONDARY RESPONSIBILITY
};

const CategoryData = () => {
  return (
    <>
      {ALL_CATEGORIES?.map((cat, index) => {
        return (
          <>
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "6px",
              }}
            >
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  mr: 1,
                  ml: "-4px",
                  background: cat.colorCode,
                }}
                variant="rounded"
              >
                <Typography sx={{ fontSize: "8px" }}>
                  {cat?.shortName}
                </Typography>
              </Avatar>
              <span
                style={{
                  textAlign: "start",
                  fontSize: "12px",
                  color: "#000",
                }}
              >
                {cat.label}
              </span>
            </Box>
          </>
        );
      })}
    </>
  );
};

const MappingData = () => {
  return (
    <>
      {Object.entries(MAPPING).map(([key, value], index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "6px",
          }}
        >
          <span style={{ paddingRight: "16px", fontSize: "16px" }}>
            {value.icon}
          </span>
          <span style={{ textAlign: "start", fontSize: "12px", color: "#000" }}>
            {value.label}
          </span>
        </Box>
      ))}
    </>
  );
};
const LegendComponent = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "40px",
        left: "10px",
        width: expanded ? 180 : 180,
        transition: "all 2s ease",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
        borderRadius: "8px",
        padding: expanded ? "16px" : "10px 16px 16px 16px",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "13px",
          marginBottom: "6px",
          color: "#000",
        }}
      >
        <strong>Legend</strong>
        <IconButton onClick={handleToggle} size="small" sx={{ padding: 0 }}>
          {expanded ? (
            <CloseFullscreenIcon sx={{ fontSize: 16 }} />
          ) : (
            <OpenInFullIcon sx={{ fontSize: 16 }} />
          )}
        </IconButton>
      </Box>

      <Collapse in={expanded} timeout={500}>
        <Box sx={{ marginTop: 1 }}>
          <MappingData />
          <Divider sx={{ mb: 1 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              fontSize: "13px",
              marginBottom: "16px",
              color: "#000",
            }}
          >
            <strong>Categories</strong>
          </Box>

          <CategoryData />
        </Box>
      </Collapse>

      {!expanded && <MappingData />}
    </Box>
  );
};

export default LegendComponent;
