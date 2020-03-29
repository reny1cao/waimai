import React, { Component } from 'react'
import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap'
import Avatar from '@material-ui/core/Avatar';
import Button from 'react-bootstrap/Button'
import './NavBar.css'

class NavBar extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg" variant="light">
                <Navbar.Brand href="#home">WAIMAI</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    {!this.props.user ? <Button id="login-button" variant="outline-secondary">Log in</Button> :
                        <NavDropdown title="username" id="nav-dropdown">
                            <NavDropdown.Item href="#">Orders</NavDropdown.Item>
                            <NavDropdown.Item href="#">Account Info</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#">Log out</NavDropdown.Item>
                        </NavDropdown>
                    }     
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavBar;