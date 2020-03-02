import React from 'react'

import Header from "./Header";
import UserList from "./UserList";


class AdminView extends React.Component {
    state = {
        view: "customers",
        customers: [
            {username:"user", password:"user"}

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
                users={this.state.customers} AdminComponent={this}
                />
                
            </div>

        );
    }
}
export default AdminView;