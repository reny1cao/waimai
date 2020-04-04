import React from 'react'

import UserList from "./AdminComponents/UserList";
import NameSearchBar from "./AdminComponents/NameSearchBar";
import RestaurantList from "./AdminComponents/RestaurantList";
import Button from 'react-bootstrap/Button';
import {getRestaurant} from '../../actions/restaurantActions'
import {getCustomer} from '../../actions/CustomerAction'
import NavBar from '../NavBar/NavBar'
import "./AdminView.css";

import { searchForName, searchForRestaurant, switchToRestaurants, switchToUsers } from "./../../actions/AdminActions";


class AdminView extends React.Component {
    constructor(props) {
        super(props);
        this.props.history.push("/AdminView")
    }

    state = {
        view: "users",
        searchName: "",
        editName: "",
        editUsername: "",
        editPassword: "",
        editAddress: "",
        editNumber:"",
        editPref:"",
        editCategory:"",
        // Users and Restaurant data here is hardcoded, would be fetched from server when signed up
        customerList: [],
        restaurantList: []

    };

    baseState = this.state;

    resetForm = () => {
        const tempName = this.state.searchName
        const tempView = this.state.view
        this.setState(this.baseState)
        getRestaurant(this)
        getCustomer(this)
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
        else if (name ==="preference") {
            this.setState({
                editPref: value
            })
        }
        else if (name ==="category") {
            this.setState({
                editCategory: value
            })
        }
        
        
    }
    //When editing the information, this will also be sent to server to update proper 
    //username and password combination. Information will also update on corresponding
    //user or restaurant profile pages.
    componentDidMount = () => {
        getRestaurant(this)
        getCustomer(this)
    }

    render() {
        const {history, app} = this.props
        this.baseState = this.state;
        if (this.state.view === "restaurants"){

            
            return (
                <div className="admin__container">
            <div className="AdminPage">
            <NavBar
                    history = {history}
                    app = {app}
                    />

            <div className="toggleContainer">
            <Button
            variant="outlined-secondary"
            onClick={() => switchToUsers(this)}
            className="admin-form__user-button"
            >
            Users
            </Button>
            <Button
            variant="btn btn-secondary"
            className="admin-form__restaurant-button"
            >
            Restaurants
            </Button>
            </div>
            <div className="searchContainer">
            <NameSearchBar
                className="search"
                fullName={this.state.searchName}
                handleChange={this.handleInputChange}
                searchForName={() => searchForRestaurant(this)}
                resetState={this.resetForm}
            />
            </div>
            <RestaurantList
            restaurants={this.state.restaurantList} AdminComponent={this} handleChangeEdit={this.handleChangeEdit}
            />
            </div>
            </div>
            )
        }
        else {
        return (
            <div className="admin__container">
            <div className="AdminPage">
            <NavBar
                    history = {history}
                    app = {app}
                    />

                <div className="toggleContainer">
                <Button
                variant="btn btn-secondary"
                className="admin-form__user-button"
                >
                Users
                </Button>
                <Button
                variant="outlined-secondary"
                onClick={() => switchToRestaurants(this)}
                className="admin-form__restaurant-button"
                >
                Restaurants
                </Button>
                </div>
                <div className="searchContainer">
                <NameSearchBar
                className="search"
                fullName={this.state.searchName}
                handleChange={this.handleInputChange}
                searchForName={() => searchForName(this)}
                resetState={this.resetForm}
                />
                </div>
                <UserList
                users={this.state.customerList} AdminComponent={this}
                handleChangeEdit={this.handleChangeEdit}
                />
                
            </div>
            </div>

        );
        }
    }
}
export default AdminView;