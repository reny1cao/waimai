import React from 'react'

import Header from "./Header";
import UserList from "./UserList";
import RestaurantList from "./RestaurantList";


class AdminView extends React.Component {
    state = {
        view: "restaurants",
        users: [
            {username:"user", password:"user"},
            {username:"user3", password:"user3"},
            {username:"user4", password:"user4"},
            {username:"user5", password:"user5"},
            {username:"user6", password:"user6"},
            {username:"user7", password:"user7"},
            {username:"user8", password:"user8"}


        ],
        restaurants: [
            {name: "Mission Chinese Food", address:"171 E Broadway, New York, NY 10002", 
            area: "all", category: "Chinese", username:"user2", password:"user2"}

        ]

    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
    }


    render() {
        if (this.state.view === "restaurants"){
            return (
            <div className="AdminPage">
            <Header
                title="Admin"
            />
            <RestaurantList
            restaurants={this.state.restaurants} AdminComponent={this}
            />
            </div>

            )
        }
        return (
            <div className="AdminPage">
                <Header
                    title="Admin"
                />
                <UserList
                users={this.state.users} AdminComponent={this}
                />
                
            </div>

        );
    }
}
export default AdminView;