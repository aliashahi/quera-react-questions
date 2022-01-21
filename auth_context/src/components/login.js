import React from 'react';

const Login = props => {
  return (
    <div className="account-form">
      <h2>Login to App</h2>
      <div className="error-message" data-testid="error-message"></div>
      <form>
        <input type="text" id="username" placeholder="Enter username" />
        <input type="password" id="password" placeholder="Enter password" />
        <button type="submit" data-testid="login-btn">
          Log in
        </button>
      </form>
      <button className="link" onClick={props.changePage}>
        Sign up for an account
      </button>
    </div>
  )
};

export default Login;
