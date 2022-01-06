import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../db/firebase";
import Style from "../../../Classes/Style";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password);
    Style.setValue("email", "");
    Style.setValue("password", "");
  };

  return (
    <div>
      <label>Email</label>
      <input onChange={(e) => setEmail(e.target.value)} id="email"></input>
      <label>Password</label>
      <input onChange={(e) => setPassword(e.target.value)} id="password"></input>
      <button onClick={register}>Register</button>
    </div>
  );
};
