import React from 'react'

import Header from "./Header";

class UserPage extends React.Component {
    states = {};


    render() {
        return (
            <div className="UserPage">
                <Header
                    title="Edit User"
                    userState="Log In"
                />
                <LogInForm
                    
                />
            </div>

        );
    }
}
export default UserPage;