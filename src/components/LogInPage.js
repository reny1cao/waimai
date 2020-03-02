import React from 'react'

import Header from "./Header";
import LogInForm from "./LogInForm";

import { logIn } from "./../actions/logInActions";
import "./LogInPage.css";

class LogInPage extends React.Component {
    state = {
        username: "",
        password: ""
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }



    render() {
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
export default LogInPage;
