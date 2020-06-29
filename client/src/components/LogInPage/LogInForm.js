import React from "react";
import Button from "react-bootstrap/Button";

import Input from "../Input";
import "./LogInForm.css";

class LogInForm extends React.Component {
  render() {
    const {
      username,
      handleChange,
      password,
      logIn,
      backTrack,
      errMsg,
      pageTitle,
    } = this.props;

    return (
      <div className="login-form__container">
        <div className="user-login-form__grid">
          <i class="fas fa-user"></i>
          <h5>{pageTitle}</h5>
          <Input
            id="userinput"
            name="username"
            value={username}
            onChange={handleChange}
            label="Username"
          />

          <Input
            id="passinput"
            name="password"
            value={password}
            onChange={handleChange}
            label="Password"
          />
          <div className="errMsg">{errMsg}</div>

          <div className="user-login-form__button-grid" container spacing={1}>
            <Button
              variant="outline-secondary"
              onClick={logIn}
              className="user-login-form__submit-button"
            >
              Log In
            </Button>
            <Button
              variant="outline-secondary"
              onClick={backTrack}
              className="user-login-form__back-button"
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default LogInForm;
