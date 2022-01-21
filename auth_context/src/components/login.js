import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/auth-context";

const Login = (props) => {
  const { setUser } = useContext(AuthContext);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const request = async (e) => {
    e.preventDefault();
    try {
      const req = await fetch("http://localhost:8989/api/login", {
        method: "POST",
        body: JSON.stringify({
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        }),
      });

      const response = await req.json();
      setUser(response.user);
    } catch ({ message }) {
      setError(message);
    }
  };
  return (
    <div className="account-form">
      <h2>Login to App</h2>
      <div className="error-message" data-testid="error-message">
        {error}
      </div>
      <form onSubmit={request}>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          ref={usernameRef}
        />
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          ref={passwordRef}
        />
        <button type="submit" data-testid="login-btn">
          Log in
        </button>
      </form>
      <button className="link" onClick={props.changePage}>
        Sign up for an account
      </button>
    </div>
  );
};

export default Login;
