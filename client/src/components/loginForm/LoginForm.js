import React from "react";
import "./LoginForm.scss";

const LoginForm = ({ onLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    onLogin({ username, password });
  };

  return (
    <>
      <h2>Login</h2>
      <form className="input__form" onSubmit={handleSubmit}>
        <div className="form__inputs">
          <div>
            Username:
            <input
              className="input__form-username"
              type="text"
              name="username"
            />
          </div>
          <div>
            Password:
            <input className="input__form-password" name="password" />
          </div>
          <button className="input__form-button">Login</button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
