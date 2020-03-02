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
        logIn
      } = this.props;
  
      return (
        <Grid className="login-form__container" container>
        <Grid className="login__bg-image" spacing={1}>
          <img src={require("./../img/login-background.jpg")}>
          </img>
            
        </Grid>

        <Grid
        className="user-login-form__grid" spacing={1}>
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

        <Grid
        className="user-login-form__button-grid" spacing={1}
        >
      

        <Button
            variant="contained"
            color="white"
            onClick={logIn}
            className="user-login-form__submit-button"
        >
        Log In
        </Button>
        </Grid>
        </Grid>
        );
    }
  }
  
  export default LogInForm;