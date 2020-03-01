import React from 'react'

import Header from "./Header";
import LogInForm from "./LogInForm";

class LogInPage extends React.Component {
    states = {};

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
    }


    render() {
        return (
            <div className="LogInPage">
                <Header
                    title="Log In"
                />
                <LogInForm
                />
            </div>

        );
    }
}
export default LogInPage;
