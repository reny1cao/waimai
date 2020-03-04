import React from 'react'
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import "./SelectUser.css";

class SelectUser extends React.Component{
    
    render() {
    
        const {title,
            handleClick} = this.props;
        
        return (
        <div className="login-form__container">
        <div className="login__bg-image" >
          <img id="img" src={require("./../img/login-background.jpg")}>
          </img>
            
        </div>

        <div
        className="select-user__grid">
                <div id="header">
                    <h3 id="title">{title}</h3>
                    <Button
                    value="Customer"
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    className="select__submit-button"
                    >
                    Customer
                    </Button>
                    <Button
                    value="Restaurant"
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    className="select__submit-button"
                    >
                    Restaurant
                    </Button>
                    <Button
                    value="Admin"
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    className="select__submit-button"
                    >
                    Admin
                    </Button>
                </div>
        </div>
        </div>
                
        );

    }
}

export default SelectUser;
