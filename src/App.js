import React from "react";
import Homepage from "./Pages/Homepage.jsx";
import Add from "./Pages/Add.jsx";
import Navbar from "./Layout/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </Router>
  );
}

export default App;
