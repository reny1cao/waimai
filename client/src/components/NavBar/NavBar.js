import React, { Component } from 'react'
import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap'
import Avatar from '@material-ui/core/Avatar';
import Button from 'react-bootstrap/Button'
import { Link,Redirect } from "react-router-dom";
import {logout} from "./../../actions/logInActions";
import './NavBar.css'
import { getRestaurant } from './../../actions/restaurantActions';
import { getCustomer,getCart } from './../../actions/CustomerAction';


class NavBar extends Component {

    state = {
        restaurantList:[],
        restaurant:[],
        customerList:[],
        customer:[],
    }
    

    logoutUser = (app) => {
        this.props.history.push("/LogInPage");
        logout(app)
    }

    accountInfo = () => {
        console.log(this.props)
        if(this.props.app.state.userType === "Customer"){
            this.state.customer = this.state.customerList.filter(l => {
                return l.username === this.props.app.state.currentUser;
            })
            this.props.history.push("/customer/"+this.state.customer[0]._id)
        }
        if(this.props.app.state.userType === "Restaurant"){
            this.state.restaurant = this.state.restaurantList.filter(l => {
                return l.username === this.props.app.state.currentUser;
            })
            this.props.history.push("/restaurant/"+this.state.restaurant[0]._id)
        }
    }

    order = () => {
        console.log(this.props.app.state.userType === "Customer")
        if(this.props.app.state.userType === "Customer"){
            this.state.customer = this.state.customerList.filter(l => {
                return l.username === this.props.app.state.currentUser;
            })
            console.log(this.state.customerCart)
            this.props.history.push("/customer/"+this.state.customer[0]._id+"/cart")
        }
        if(this.props.app.state.userType === "Restaurant"){
            this.state.restaurant = this.state.restaurantList.filter(l => {
                return l.username === this.props.app.state.currentUser;
            })
            this.props.history.push("/restaurant/"+this.state.restaurant[0]._id+"/order")
        }
    }

    componentDidMount = () => {
        getCustomer(this)
        getRestaurant(this)
    }

    render() {

        const {app} = this.props

        return (
            <Navbar bg="light" expand="lg" variant="light">
                <Navbar.Brand href="/">WAIMAI</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    {!app.state.userType ? 
                        <div>
                        <Link to={"/logInPage"}>
                            <Button href="" id="login-button" variant="outline-secondary">Log in</Button>
                        </Link>
                        <Link to={"/SignUpPage"} >
                            <Button variant="dark">Sign up</Button>
                        </Link>
                        </div> 
                        :
                        <div className="logged-in-nav">
                            <Avatar className="avatar" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            <NavDropdown title={app.state.currentUser} id="nav-dropdown">
                                <NavDropdown.Item href="#" onSelect={this.order}>Orders</NavDropdown.Item>
                                <NavDropdown.Item href="#" onSelect={this.accountInfo}>Account Info</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#" onSelect={() => this.logoutUser(app)} >Log out</NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    }     
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavBar;