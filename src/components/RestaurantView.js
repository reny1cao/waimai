import React from 'react'

import Header from "./Header";

class RestaurantPage extends React.Component {
    states = {};


    render() {
        return (
            <div className="RestaurantPage">
                <Header
                    title="Edit Restaurant"
                    userState="Log In"
                />
                <LogInForm
                    
                />
            </div>

        );
    }
}
export default RestaurantPage;