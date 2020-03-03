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
        errMsg
      } = this.props;
  
      return (
        <Grid className="login-form__container" container spacing={1}>
        <Grid className="login__bg-image" >
          <img src={require("./../img/login-background.jpg")}>
          </img>
            
        </Grid>

        <Grid
        className="user-login-form__grid" container spacing={1}>
        <Input
        name="username"
        value={username}
        onChange={handleChange}
        label="Username"
        />

        <Input
        name="password"
        value={password}
        onChange={handleChange}
        label="Password"
        />
        </Grid>
        <div className='errMsg'>{errMsg}</div>

        <Grid
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
        </Grid>
        </Grid>
        );
    }
  }
  
  export default LogInForm;