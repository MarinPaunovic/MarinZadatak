import React from "react";
import Homepage from "./Pages/Homepage";
import Add from "./Pages/Coin/Add/Add.jsx";
import Navbar from "./Layout/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import { Register } from "./Pages/User/Register/Register";
import { Login } from "./Pages/User/Login/Login";
import { EditWrapper } from "./Pages/Coin/Edit/EditWrapper.jsx";
import { auth } from "./db/firebase";
import { onAuthStateChanged } from "firebase/auth";
import AuthUser from "./Pages/User/Auth/AuthUser";
import Comment from "./Pages/Comments/Comment/Comment";
import { CommentsWrapper } from "./Pages/Comments/CommentsWrapper";
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
        <Route path="/edit/:editid" element={<EditWrapper />} />
        <Route path="/comments/:commentId" element={<CommentsWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
