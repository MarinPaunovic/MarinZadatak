import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../db/firebase";
import AuthUser from "../Classes/AuthUser";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";

export const Login = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const login = async () => {
    let userSignIn;
    setLoading(true);
    try {
      userSignIn = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      document.getElementById("Message").style.display = "inline";
    }
    if (userSignIn) {
      document.getElementById("Message").style.display = "none";
      setLoading(false);
      AuthUser.setUserAuth(true);
      navigate("/");
    } else {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  return (
    <div>
      <label>Email</label>
      <input onChange={(e) => setEmail(e.target.value)} id="EmailId"></input>
      <label>Password</label>
      <input onChange={(e) => setPassword(e.target.value)} id="PasswordId"></input>
      <button disabled={loading} onClick={login}>
        Login
      </button>
      <p
        style={{
          color: "#d8000c",
          display: "none",
          marginLeft: "10px",
          backgroundColor: "#ffd2d2",
          backgroundSize: "10px",
        }}
        id="Message"
      >
        Wrong Email or Password
      </p>
    </div>
  );
});
