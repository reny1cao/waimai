import React, { Component } from 'react'
import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap'
import Avatar from '@material-ui/core/Avatar';
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";
import {logout} from "./../../actions/logInActions";
import './NavBar.css'

class NavBar extends Component {
    

    logoutUser = (app) => {
        this.props.history.push("/LogInPage");
        logout(app)
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
                            <NavDropdown title={this.props.user} id="nav-dropdown">
                                <NavDropdown.Item href="#">Orders</NavDropdown.Item>
                                <NavDropdown.Item href="#">Account Info</NavDropdown.Item>
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