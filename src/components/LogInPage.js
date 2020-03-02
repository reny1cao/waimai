import React from 'react'

import Header from "./Header";
import LogInForm from "./LogInForm";
import SelectUser from "./SelectUser";

import { logIn } from "./../actions/logInActions";
import "./LogInPage.css";

class LogInPage extends React.Component {
    state = {
        username: "",
        password: "",
        userType: ""
    };

    handleInputChange = event => {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    handleClick = event => {
        const target = event.target;
        const value = target.value;
        
        this.setState({
            userType: value
        })

    }


    render() {
        if (this.state.userType === ""){
            return(
                <div className="LogInPage">
                    <Header
                        title="Log In"
                        userState="Log In"
                    />

                    <SelectUser
                        title='I would like to log in as:'
                        handleClick={this.handleClick}
                        
                    />
                </div>

            )
        }
        else if (this.state.userType === "Customer") {
            return (
                    <div className="LogInPage">
                        <Header
                            title="Log In"
                            userState="Log In"
                        />

                        <LogInForm
                            username={this.state.username}
                            password={this.state.password}
                            handleChange={this.handleInputChange}
                            logIn={() => logIn(this)}
                            
                        />
                    </div>

                );
        }
        else if (this.state.userType === "Restaurant") {
            return (
                    <div className="LogInPage">
                        <Header
                            title="Log In"
                            userState="Log In"
                        />

                        <LogInForm
                            username={this.state.username}
                            password={this.state.password}
                            handleChange={this.handleInputChange}
                            logIn={() => logIn(this)}
                            
                        />
                    </div>

            );
            
        }
        else if (this.state.userType === "Admin") {
            return (
                <div className="LogInPage">
                    <Header
                        title="Log In"
                        userState="Log In"
                    />
                    <LogInForm
                        username={this.state.username}
                        password={this.state.password}
                        handleChange={this.handleInputChange}
                        logIn={() => logIn(this)}
                            
                    />
                </div>

            );
        }
    }
    
}
export default LogInPage;
