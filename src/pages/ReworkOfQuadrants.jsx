import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import { QUADRANTS_CONSTANT } from "../db/quadrantsReConstant";
import QuadrantButtons from "./quadrantButtons";

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
    };
  }, []);

  // Helper: get quadrant by position
  const getQuadrant = (pos) =>
    data.quadrants.find((q) => q.quadrantPosition === pos);

  const rotateEntire = ({ index, buttonClick }) => {
    setData((prev) => {
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
    // console.log(defaultPositions, defaultPositions[0]);
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
    // if (defaultPositions[0] === "bottom") {
    //   // default view
    //   setMargin((prev) => {
    //     return {
    //       topleft: { marginRight: "0px" },
    //       topright: { marginLeft: "0px" },
    //       bottomright: { marginLeft: "0px" },
    //       bottomleft: { marginRight: "0px" },
    //     };
    //   });
    // }
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
    console.log(defaultPositions);
  }, [defaultPositions]);

  const getLength = (pos) => getQuadrant(pos)?.quadrantListItems.length || 0;

  return (
    <>
      <QuadrantButtons emitSelectedRotation={rotateEntire} show={true} />

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
              transform: "rotate(270deg)",
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
              transform: "rotate(270deg)",
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

              // Find clipPath index by quadrantPosition
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
                    transition: "background-color 0.3s ease",
                  }}
                />
              );
            })}
          </Box>
          {/* Grids for corners */}
          {/* Helper to get list length safely */}

          {/* Top-Right Grid */}
          <Box
            gridArea="top-right"
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${getLength("right")}, 1fr)`,
              gridTemplateRows: `repeat(${getLength("top")}, 1fr)`,
              width: `${getLength("right") * cellSize}px`,
              height: `${getLength("top") * cellSize}px`,
              //   marginLeft: "-39px",
              ...margins.topright,
              "& > div": gridCell,
            }}
          >
            {Array.from({ length: getLength("top") * getLength("right") }).map(
              (_, i) => (
                <Box key={i}>{i + 1}</Box>
              )
            )}
          </Box>

          {/* Bottom-Right Grid */}
          {/* <Box
            gridArea="bottom-right"
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${getLength("right")}, 1fr)`,
              gridTemplateRows: `repeat(${getLength("bottom")}, 1fr)`,
              width: `${getLength("right") * cellSize}px`,
              height: `${getLength("bottom") * cellSize}px`,
              border: "1px solid #aaa",
              //   marginLeft: "-39px",
              ...margins.topright,
              "& > div": gridCell,
            }}
          >
            {Array.from({
              length: getLength("bottom") * getLength("right"),
            }).map((_, i) => (
              <Box key={i}>{i + 1}</Box>
            ))}
          </Box> */}

          {/* Bottom-Left Grid */}
          <Box
            gridArea="bottom-left"
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${getLength("left")}, 1fr)`,
              gridTemplateRows: `repeat(${getLength("bottom")}, 1fr)`,
              width: `${getLength("left") * cellSize}px`,
              height: `${getLength("bottom") * cellSize}px`,
              //   marginRight: "-39px",
              ...margins.bottomleft,
              "& > div": gridCell,
            }}
          >
            {Array.from({
              length: getLength("bottom") * getLength("left"),
            }).map((_, i) => (
              <Box key={i}>{i + 1}</Box>
            ))}
          </Box>

          {/* Top-Left Grid */}
          <Box
            gridArea="top-left"
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${getLength("left")}, 1fr)`,
              gridTemplateRows: `repeat(${getLength("top")}, 1fr)`,
              width: `${getLength("left") * cellSize}px`,
              height: `${getLength("top") * cellSize}px`,
              //   marginRight: "-39px",
              ...margins.topleft,
              "& > div": gridCell,
            }}
          >
            {Array.from({ length: getLength("top") * getLength("left") }).map(
              (_, i) => (
                <Box key={i}>{i + 1}</Box>
              )
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TriangleBox;
