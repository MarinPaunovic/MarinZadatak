import React, { useEffect } from "react";
import { AddItem } from "./AddItem";
import { userAuth } from "../../../Functions/userAuth";
import { useNavigate } from "react-router-dom";

const AddToList = () => {
  const navigate = useNavigate();
  // const userAuthh = userAuth();

  useEffect(() => {
    if (!userAuth()) {
      navigate("/login");
    }
  }, []);

  if (userAuth()) {
    return <AddItem />;
  }
  return null;
};
export default AddToList;
