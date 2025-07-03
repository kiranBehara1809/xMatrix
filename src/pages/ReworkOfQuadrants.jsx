import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Avatar,
  Collapse,
} from "@mui/material";
import { QUADRANTS_CONSTANT } from "../db/quadrantsReConstant";
import QuadrantButtons from "./quadrantButtons";
import CircleIcon from "@mui/icons-material/Circle";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";

const VerticalDivider = () => (
  <div
    style={{
      width: "1px",
      backgroundColor: "#000",
      height: "100%",
      margin: "0 20px",
    }}
  />
);

const UserDetails = () => {
  const userName = localStorage.getItem("userName");
  return (
    <Box
      sx={{
        position: "absolute",
        top: "10px",
        right: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "auto",
        height: "30px",
        borderRadius: "8px",
        padding: "8px 12px",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
      }}
    >
      <Avatar
        sx={{ width: 25, height: 25, backgroundColor: "#1976d2" }}
        variant="rounded"
      >
        {userName?.split("")[0].toUpperCase()}
      </Avatar>
      <Typography
        sx={{
          marginLeft: "8px",
          fontSize: "14px",
          color: "#000",
          fontWeight: "bold",
        }}
      >
        {userName
          ?.toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </Typography>
      <VerticalDivider />
      <Typography
        sx={{
          fontSize: "14px",
          color: "#000",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => {
          localStorage.removeItem("userName");
          window.location.href = "/login";
        }}
      >
        Logout
      </Typography>
    </Box>
  );
};

const ProjectHeader = () => {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "10px",
          left: "10px",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#000",
          padding: "10px 16px",
          borderRadius: "8px",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
        }}
      >
        X-Matrix
      </Box>
    </>
  );
};

const LegendComponent = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "10px",
        left: "10px",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
        borderRadius: "8px",
        padding: "10px 16px 16px 16px",
      }}
    >
      <span
        style={{
          textAlign: "start",
          fontSize: "13px",
          color: "#000",
        }}
      >
        Keys
      </span>
      {Object.entries(MAPPING)?.map(([key, value], index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "4px",
          }}
        >
          <span style={{ paddingRight: "8px", fontSize: "16px" }}>
            {value.icon}
          </span>
          <span style={{ textAlign: "start", fontSize: "12px", color: "#000" }}>
            {value.label}
          </span>
        </Box>
      ))}
    </Box>
  );
};

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

const cellSize = 30;

const initialData = {
  quadrants: [
    {
      quadrantName: "a",
      quadrantColor: "red",
      quadrantPosition: "top",
      updatedPosition: "",
      quadrantListItems: ["Top 1", "Top 2", "Top 3", "Top 4"],
    },
    {
      quadrantName: "b",
      quadrantColor: "blue",
      quadrantPosition: "right",
      updatedPosition: "",
      quadrantListItems: ["Right 1", "Right 2"],
    },
    {
      quadrantName: "c",
      quadrantColor: "green",
      quadrantPosition: "bottom",
      updatedPosition: "",
      quadrantListItems: ["Bottom 1", "Bottom 2"],
    },
    {
      quadrantName: "d",
      quadrantColor: "yellow",
      quadrantPosition: "left",
      updatedPosition: "",
      quadrantListItems: ["Left 1", "Left 2", "Left 3"],
    },
  ],
};

const QuadrantListItem = ({ item, i }) => {
  return (
    <>
      <Typography
        key={i}
        variant="caption"
        sx={{
          color: "#000",
          maxWidth: "100%",
          minWidth: "100%",
          minHeight: 30,
          fontSize: "11px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          lineHeight: 2.66,
          textOverflow: "ellipsis",
          borderBottom: "0.5px dotted",
        }}
      >
        {item.rowName}
      </Typography>
    </>
  );
};

const TriangleBox = () => {
  const [data, setData] = useState(
    JSON.parse(JSON.stringify(QUADRANTS_CONSTANT))
  );
  const [defaultPositions, setDefaultPositions] = useState([
    "top",
    "right",
    "bottom",
    "left",
  ]);
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
    return () => {
      setDefaultPositions(["top", "right", "bottom", "left"]);
      setData(JSON.parse(JSON.stringify(QUADRANTS_CONSTANT)));
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

    // Step 1: Hide all immediately
    setShowQuadrants({
      topRight: false,
      bottomRight: false,
      bottomLeft: false,
      topLeft: false,
    });

    // Step 2: Show one by one based on targetState
    const keys = Object.keys(targetState);
    keys.forEach((key, index) => {
      setShowQuadrants((prev) => ({
        ...prev,
        [key]: targetState[key],
      }));
    });
  }, [data]);

  const getQuadrant = (pos) =>
    data.quadrants.find((q) => q.quadrantPosition === pos);

  const triggerAnimationSequence = () => {
    const keys = Object.keys(animation);

    // Step 1: Hide all
    setAnimation((prev) => {
      const updated = {};
      keys.forEach((key) => {
        updated[key] = false;
      });
      return updated;
    });

    // Step 2: Show one by one with delay
    keys.forEach((key, index) => {
      setTimeout(() => {
        setAnimation((prev) => ({
          ...prev,
          [key]: true,
        }));
      }, 300 * index); // 300ms delay between each item
    });
  };

  const rotateEntire = ({ index, buttonClick }) => {
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
    console.log(defaultPositions);
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

    // if (defaultPositions[0] === "bottom") {
    //   // default view
    //   setMargin((prev) => {
    //     return {
    //       topleft: { marginRight: "-100px" },
    //       topright: { marginLeft: "-39px" },
    //       bottomleft: { marginLeft: "0px" },
    //       bottomright: { marginLeft: "0px" },
    //       topList: {},
    //       bottomList: {},
    //       leftList: { marginRight: "0px" },
    //       rightList: { marginRight: "39px" },
    //     };
    //   });
    //  }
  }, [defaultPositions]);

  const getLength = (pos) => getQuadrant(pos)?.quadrantListItems.length || 0;

  const noOfBoxes = (a, b) => {
    const qAItems = getQuadrant(a)?.quadrantListItems;
    const qBItems = getQuadrant(b)?.quadrantListItems;
    let mappeditems = [];
    qAItems?.map((qa) => {
      qBItems?.map((qb) => {
        mappeditems.push(`${qa.rowId}~~X~~${qb.rowId}`);
      });
    });
    return mappeditems;
  };

  const getNewIntersections = (quadrantA, quadrantB, obj) => {
    const partsOfMap = obj.split("~~X~~");
    let foundIntersections = [];

    const allQItems = QUADRANTS_CONSTANT.quadrants?.map((x) => {
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
      return MAPPING[a["type"]].icon ?? "";
    } else {
      return "";
    }
  };

  return (
    <>
      <UserDetails />
      <ProjectHeader />
      <QuadrantButtons emitSelectedRotation={rotateEntire} show={true} />
      <LegendComponent />

      <Box
        sx={{
          height: "100dvh",
          width: "100dvw",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateAreas: `
            "top-left top top-right"
            "left center right"
            "bottom-left bottom bottom-right"
          `,
            gridTemplateColumns: "auto 200px auto",
            gridTemplateRows: "auto 200px auto",
            justifyItems: "center",
            alignItems: "center",
            padding: 2,
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
              width: "200px",
              background: "lightgray",
              //   ...margins.topright,
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            }}
          >
            {getQuadrant("top").quadrantListItems.map((item, i) => (
              <>
                <QuadrantListItem item={item} i={i} />
              </>
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
              height: `${getLength("right") * cellSize}px`,
              width: "200px",
              transform: "rotate(-90deg)",
              background: "lightgray",
              //   marginLeft: "-39px",
              //   ...(defaultPositions[0] === "right" && {
              //     ...margins.topright,
              //   }),
              ...margins.rightList,
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            }}
          >
            {getQuadrant("right").quadrantListItems.map((item, i) => (
              <QuadrantListItem item={item} i={i} />
            ))}
          </Box>

          {/* Bottom - vertical */}
          <Box
            gridArea="bottom"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: `${getLength("bottom") * cellSize}px`,
              width: "200px",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            }}
          >
            {getQuadrant("bottom").quadrantListItems.map((item, i) => (
              <QuadrantListItem item={item} i={i} />
            ))}
          </Box>

          {/* Left - horizontal */}
          <Box
            gridArea="left"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: `${getLength("left") * cellSize}px`,
              width: "200px",
              transform: "rotate(-90deg)",
              background: "lightGray",
              //   marginRight: "-39px",
              ...margins.leftList,
            }}
          >
            {getQuadrant("left").quadrantListItems.map((item, i) => (
              <QuadrantListItem item={item} i={i} />
            ))}
          </Box>

          {/* Center square with triangles - dynamic colors */}
          <Box
            gridArea="center"
            sx={{
              width: 200,
              height: 200,
              position: "relative",
            }}
          >
            {data.quadrants.map((q, i) => {
              // Define clip paths in order top, right, bottom, left
              const clipPaths = [
                "polygon(0% 0%, 100% 0%, 50% 50%)", // top triangle
                "polygon(100% 0%, 100% 100%, 50% 50%)", // right triangle
                "polygon(100% 100%, 0% 100%, 50% 50%)", // bottom triangle
                "polygon(0% 100%, 0% 0%, 50% 50%)", // left triangle
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
                    backgroundColor: q.quadrantColor,
                    transition: "background-color 1s ease-in-out",
                  }}
                />
              );
            })}
          </Box>
          {/* Grids for corners */}

          {/* Top-Right Grid */}
          {/* {showQuadrants?.topRight && ( */}
          <Box
            gridArea="top-right"
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${getLength("right")}, 1fr)`,
              gridTemplateRows: `repeat(${getLength("top")}, 1fr)`,
              width: `${getLength("right") * cellSize}px`,
              height: `${getLength("top") * cellSize}px`,
              // ...margins.topright,
              border: "none !important",
              ...margins.rightList,
              opacity: showQuadrants.topRight ? 1 : 0,
              transition: "opacity 1.5s ease-in-out",
              "& > div": gridCell,
            }}
          >
            {noOfBoxes("top", "right").map((val, i) => (
              <Box
                key={i}
                title={val}
                sx={{ border: "0.5px dashed gray !important" }}
              >
                {getNewIntersections("top", "right", val)}
              </Box>
            ))}
          </Box>
          {/* )} */}

          {/* Bottom-Right Grid */}
          {/* {showQuadrants?.bottomRight && ( */}
          <Box
            gridArea="bottom-right"
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${getLength("right")}, 1fr)`,
              gridTemplateRows: `repeat(${getLength("bottom")}, 1fr)`,
              width: `${getLength("right") * cellSize}px`,
              height: `${getLength("bottom") * cellSize}px`,
              border: "none !important",
              ...margins.topright,
              opacity: showQuadrants.bottomRight ? 1 : 0,
              transition: "opacity 1.5s ease-in-out",
              "& > div": gridCell,
            }}
          >
            {noOfBoxes("bottom", "right").map((val, i) => (
              <Box
                key={i}
                title={val}
                sx={{ border: "0.5px dashed gray !important" }}
              >
                {getNewIntersections("bottom", "right", val)}
              </Box>
            ))}
          </Box>
          {/* )} */}

          {/* Bottom-Left Grid */}
          {/* {showQuadrants?.bottomLeft && ( */}
          <Box
            gridArea="bottom-left"
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${getLength("left")}, 1fr)`,
              gridTemplateRows: `repeat(${getLength("bottom")}, 1fr)`,
              width: `${getLength("left") * cellSize}px`,
              border: "none !important",
              height: `${getLength("bottom") * cellSize}px`,
              ...margins.bottomleft,
              opacity: showQuadrants.bottomLeft ? 1 : 0,
              transition: "opacity 1.5s ease-in-out",
              "& > div": gridCell,
            }}
          >
            {noOfBoxes("left", "bottom").map((val, i) => (
              <Box
                key={i}
                title={val}
                sx={{ border: "0.5px dashed gray !important" }}
              >
                {getNewIntersections("bottom", "left", val)}
              </Box>
            ))}
          </Box>
          {/* )} */}

          {/* Top-Left Grid */}
          {
            <Box
              gridArea="top-left"
              sx={{
                display: showQuadrants.topLeft ? "grid" : "none",
                gridTemplateColumns: `repeat(${getLength("left")}, 1fr)`,
                gridTemplateRows: `repeat(${getLength("top")}, 1fr)`,
                width: `${getLength("left") * cellSize}px`,
                height: `${getLength("top") * cellSize}px`,
                border: "none !important",
                opacity: showQuadrants.topLeft ? 1 : 0,
                transition: "opacity 1.5s ease-in-out",
                ...margins.topleft,
                "& > div": gridCell,
              }}
            >
              {noOfBoxes("top", "left").map((val, i) => (
                <Box
                  key={i}
                  title={val}
                  sx={{ border: "0.5px dashed gray !important" }}
                >
                  {getNewIntersections("top", "left", val)}
                </Box>
              ))}
            </Box>
          }
        </Box>
      </Box>
    </>
  );
};

export default TriangleBox;
