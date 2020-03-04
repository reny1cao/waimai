import React from 'react'
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';


class SelectUser extends React.Component{
    
    render() {
    
        const {title,
            handleClick} = this.props;
        
        return (
        <Grid className="login-form__container" container spacing={1}>
        <Grid className="login__bg-image" >
          <img src={require("./../img/login-background.jpg")}>
          </img>
            
        </Grid>

        <Grid
        className="select-user__grid" container spacing={3}>
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
        </Grid>
        </Grid>
                
        );

    }
}

export default SelectUser;
