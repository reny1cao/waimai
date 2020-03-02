import React from 'react'

import Header from "./Header";
import UserList from "./UserList";


class AdminView extends React.Component {
    state = {
        view: "customers",
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

        ]

    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
    }


    render() {
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