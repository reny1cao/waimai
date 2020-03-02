import React from 'react'

import Header from "./Header";
import UserList from "./UserList";
import RestaurantList from "./RestaurantList";
import Button from '@material-ui/core/Button';

import { switchToRestaurants, switchToUsers } from "./../actions/AdminActions";


class AdminView extends React.Component {

    state = {
        view: "users",
        users: [
            {name: "Allen Hsiao", username:"user", password:"user"},
            {name: "Allen Hsiao", username:"user3", password:"user3"},
            {name: "Allen Hsiao", username:"user4", password:"user4"},
            {name: "Allen Hsiao", username:"user5", password:"user5"},
            {name: "Allen Hsiao", username:"user6", password:"user6"},
            {name: "Allen Hsiao", username:"user7", password:"user7"},
            {name: "Allen Hsiao", username:"user8", password:"user8"}


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
            <Button
            variant="contained"
            color="primary"
            onClick={() => switchToUsers(this)}
            className="admin-form__user-button"
            >
            Users
            </Button>
            <Button
            variant="contained"
            color="secondary"
            className="admin-form__restaurant-button"
            >
            Restaurants
            </Button>
            <RestaurantList
            restaurants={this.state.restaurants} AdminComponent={this}
            />
            </div>

            )
        }
        else {
        return (
            <div className="AdminPage">
                <Header
                    title="Admin"
                />
                <Button
                variant="contained"
                color="secondary"
                className="admin-form__user-button"
                >
                Users
                </Button>
                <Button
                variant="contained"
                color="primary"
                onClick={() => switchToRestaurants(this)}
                className="admin-form__restaurant-button"
                >
                Restaurants
                </Button>
                <UserList
                users={this.state.users} AdminComponent={this}
                />
                
            </div>

        );
        }
    }
}
export default AdminView;