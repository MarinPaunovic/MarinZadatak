import React from "react";
import Homepage from "./Pages/Coin/Homepage/Homepage";
import Add from "./Pages/Coin/Add/Add.jsx";
import Navbar from "./Layout/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Register } from "./Pages/User/Register/Register";
import { Login } from "./Pages/User/Login/Login";
import { EditWrapper } from "./Pages/Coin/Edit/EditWrapper.jsx";
import { CommentsWrapper } from "./Pages/Comments/CommentsWrapper";
import { Provider } from "mobx-react";
import CoinStoreWrapper from "./Pages/Coin/Stores/CoinStoreWrapper";
import CommentsStoreWrapper from "./Pages/Comments/Stores/CommentsStoreWrapper";
import { observer } from "mobx-react";

function App() {
  return (
    <Provider coinStore={CoinStoreWrapper} commentStore={CommentsStoreWrapper}>
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
    </Provider>
  );
}

export default observer(App);
