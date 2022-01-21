import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/auth-context";

const Register = (props) => {
  const { setUser } = useContext(AuthContext);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const request = async (e) => {
    e.preventDefault();
    try {
      const req = await fetch("http://localhost:8989/api/register", {
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
      <h2>Sign up</h2>
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
        <button type="submit" data-testid="register-btn">
          Register
        </button>
      </form>
      <button className="link" onClick={props.changePage}>
        Already have an account? Log In
      </button>
    </div>
  );
};

export default Register;
