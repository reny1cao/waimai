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
        <Grid className="login__bg-image center" spacing={1}>

            
        </Grid>
        <Grid
        className="user-login-form__grid"
        item
        xl={2}
        lg={2}
        md={12}
        s={12}
        xs={12}
        >
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
        className="user-login-form__button-grid"
        item
        xl={2}
        lg={2}
        md={12}
        s={12}
        xs={12}
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