import React from "react";
import Homepage from "./Pages/Homepage";
import Add from "./Pages/Coin/Add/Add.jsx";
import Navbar from "./Layout/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Register } from "./Pages/User/Register/Register";
import { Login } from "./Pages/User/Login/Login";
import { Edit } from "./Pages/Coin/Edit/Edit.jsx";
import { auth } from "./db/firebase";
import { onAuthStateChanged } from "firebase/auth";
import AuthUser from "./Pages/User/Auth/AuthUser";
import { Comment } from "./Pages/Comments/Comment/Comment";

function App() {
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     AuthUser.setUserAuth(true);
  //   } else AuthUser.setUserAuth(false);
  // });

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/add" element={<Add />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit/:editid" element={<Edit />} />
        <Route path="/comments/:commentId" element={<Comment />} />
      </Routes>
    </Router>
  );
}

export default App;
