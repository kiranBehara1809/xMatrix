import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import TriangleBox from "./pages/ReworkOfQuadrants";
import Layout from "./pages/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Layout />} />
        <Route path="/newHome" element={<TriangleBox />} />
      </Routes>
    </Router>
  );
}

export default App;
