import React from "react";
import Homepage from "./Pages/Homepage";
import Add from "./Pages/Add";
import Navbar from "./Layout/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Register } from "./Pages/Register";
import { Login } from "./Pages/Login";
import { Edit } from "./Pages/Edit";
import { auth } from "./db/firebase";
import { onAuthStateChanged } from "firebase/auth";
import AuthUser from "./Classes/AuthUser";

function App() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      AuthUser.setUserAuth(true);
    } else AuthUser.setUserAuth(false);
  });

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/add" element={<Add />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit/:editid" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
