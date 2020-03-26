import React from 'react'
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';


import Input from './Input';
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
        pageTitle
      } = this.props;
  
      return (
        <div className="login-form__container">
        <div className="login__bg-image" >
          <img id='img' src={require("./../img/login-background.jpg")}>
          </img>
            
        </div>

        <div
        className="user-login-form__grid">
          <h1>{pageTitle}</h1>
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
        <div className='errMsg'>{errMsg}</div>

        <div
        className="user-login-form__button-grid" container spacing={1}
        >
      

        <Button
            variant="contained"
            color="primary"
            onClick={logIn}
            className="user-login-form__submit-button"
        >
        Log In
        </Button>
        <Button
            variant="contained"
            color="primary"
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