import React from 'react'

import Header from "./Header";

class AdminPage extends React.Component {
    states = {};

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
    }


    render() {
        return (
            <div className="AdminPage">
                <Header
                    title="Admin"
                    userState="Log In"
                />
                <LogInForm
                    
                />
            </div>

        );
    }
}
export default AdminPage;