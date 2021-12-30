import React, { useEffect } from "react";
import { AddItem } from "../Components/AddItem";
import { userAuth } from "../Functions/userAuth";
import { useNavigate } from "react-router-dom";

const AddToList = () => {
  const navigate = useNavigate();
  const userAuthh = userAuth();

  useEffect(() => {
    if (!userAuthh) {
      navigate("/login");
    }
  }, []);

  if (userAuthh) {
    return <AddItem />;
  }
  return null;
};
export default AddToList;
