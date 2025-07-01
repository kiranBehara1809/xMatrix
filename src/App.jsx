// import React from "react";
// import { Typography } from "@mui/material";
// import Quadrants from "./pages/quadrants";
// import QuadrantsWithAnimations from "./pages/quadrantsWithAnimations";
// import QuadrantsWithAniAnIntersections from "./pages/quadrantsWithAniAnIntersections";
// import Box from "@mui/material/Box";

// const App = () => {
//   return (
//     <Box
//       sx={{
//         width: "100vw",
//         height: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         overflow: "hidden",
//       }}
//     >
//       {/* <Quadrants /> */}
//       {/* <QuadrantsWithAnimations /> */}
//       <QuadrantsWithAniAnIntersections />
//     </Box>
//   );
// };

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import QuadrantsWithAniAnIntersections from "./pages/quadrantsWithAniAnIntersections";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<QuadrantsWithAniAnIntersections />} />
      </Routes>
    </Router>
  );
}

export default App;
