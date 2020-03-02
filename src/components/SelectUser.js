import React from 'react'
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';


class SelectUser extends React.Component{
    
    render() {
    
        const {title,
            handleClick,
            chooseUser} = this.props;
        
        return (
        <Grid className="login-form__container" container>
        <Grid className="login__bg-image" spacing={1}>
          <img src={require("./../img/login-background.jpg")}>
          </img>
            
        </Grid>

        <Grid
        className="select-user__grid" spacing={5}>
                <div id="header">
                    <h1 id="title">{title}</h1>
                    <Button
                    variant="contained"
                    color="white"
                    onClick={chooseUser}
                    className="select__submit-button"
                    >
                    Customer
                    </Button>
                    <Button
                    variant="contained"
                    color="white"
                    onClick={chooseUser}
                    className="select__submit-button"
                    >
                    Restaurant
                    </Button>
                    <Button
                    variant="contained"
                    color="white"
                    onClick={chooseUser}
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
