import React from 'react'

import Header from "./Header";
import UserList from "./UserList";
import NameSearchBar from "./NameSearchBar";
import RestaurantList from "./RestaurantList";
import Button from '@material-ui/core/Button';

import { searchForName, searchForRestaurant, switchToRestaurants, switchToUsers } from "./../actions/AdminActions";


class AdminView extends React.Component {

    state = {
        view: "users",
        searchName: "",
        editName: "",
        editUsername: "",
        editPassword: "",
        editAddress: "",
        editNumber:"",
        users: [
            {name: "Allen Hsiao", address: "205 E Houston St, New York, NY 10002", number:"647-8683416", area:"", preference:"", username:"user", password:"user"},
            {name: "Alice Hsiao",address: "205 E Houston St, New York, NY 10002", number:"647-8683416", area:"", preference:"", username:"user3", password:"user3"},
            {name: "Allen Chen", address: "205 E Houston St, New York, NY 10002", number:"647-8683416", area:"", preference:"",username:"user4", password:"user4"},
            {name: "Steven Hsiao", address: "205 E Houston St, New York, NY 10002", number:"647-8683416", area:"", preference:"", username:"user5", password:"user5"},
            {name: "Mary Hsiao", address: "205 E Houston St, New York, NY 10002", number:"647-8683416", area:"", preference:"", username:"user6", password:"user6"},
            {name: "Alfred Nyugen", address: "205 E Houston St, New York, NY 10002", number:"647-8683416", area:"", preference:"", username:"user7", password:"user7"},
            {name: "Steven Lee", address: "205 E Houston St, New York, NY 10002", number:"647-8683416", area:"", preference:"", username:"user8", password:"user8"},


        ],
        restaurants: [
            {name: "Mission Chinese Food", address:"171 E Broadway, New York, NY 10002", 
            area: "all", category: "Chinese", username:"user2", password:"user2"},
            {name: "Emily", address:"919 Fulton St, Brooklyn, NY 11238", 
            area: "all", category: "Pizza", username:"user13", password:"user13"},
            {name: "Kang Ho Dong Baekjeong", address:"1 E 32nd St, New York, NY 10016", 
            area: "all", category: "Asian", username:"user14", password:"user14"},
            {name: "Lee's Chinese Food", address:"172 E Broadway, New York, NY 10002", 
            area: "all", category: "Chinese", username:"user12", password:"user12"},
            {name: "Miss Foodie", address:"1 E Broadway, New York, NY 10002", 
            area: "all", category: "Chinese", username:"user15", password:"user15"},
        

        ]

    };

    baseState = this.state;

    resetForm = () => {
        const tempName = this.state.searchName
        const tempView = this.state.view
        this.setState(this.baseState)
        this.setState({
            searchName: tempName,
            view: tempView
        })
    }

    handleInputChange = event => {

        const target = event.target;
        const value = target.value;

        this.setState({
            searchName: value
        })

    }

    handleChangeEdit = event=>{
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (name === "name"){
        this.setState({
            editName: value
        })
    }
        else if (name === "username"){
            this.setState({
                editUsername: value
            })
        }
        else if (name ==="password") {
            this.setState({
                editPassword: value
            })
        }
        else if (name ==="address") {
            this.setState({
                editAddress: value
            })
        }

        else if (name ==="number") {
            this.setState({
                editNumber: value
            })
        }
        
        
    }


    render() {
        if (this.state.view === "restaurants"){
            return (
            <div className="AdminPage">
            <Header
                title="Admin"
                userState="Log In"
                userState1="Sign Up"
            />
            <NameSearchBar
                fullName={this.state.searchName}
                handleChange={this.handleInputChange}
                searchForName={() => searchForRestaurant(this)}
                resetState={this.resetForm}
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
            restaurants={this.state.restaurants} AdminComponent={this} handleChangeEdit={this.handleChangeEdit}
            />
            </div>

            )
        }
        else {
        return (
            <div className="AdminPage">
                <Header
                    title="Admin"
                    userState="Log In"
                    userState1="Sign Up"
                />
                <NameSearchBar
                fullName={this.state.searchName}
                handleChange={this.handleInputChange}
                searchForName={() => searchForName(this)}
                resetState={this.resetForm}
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
                handleChangeEdit={this.handleChangeEdit}
                />
                
            </div>

        );
        }
    }
}
export default AdminView;