import AuthUser from "../Classes/AuthUser";
import { useEffect, useState } from "react";

export const useIsUser = () => {
  let authState = localStorage.getItem("UserAuth");
  authState = JSON.parse(authState).userAuth;

  const [isUser, setIsUser] = useState(authState);
  const user = AuthUser.getStoredData();

  useEffect(() => {
    user.then((data) => setIsUser(data.userAuth));
    return;
  }, [AuthUser.userAuth]);

  return isUser;
};
