import React from 'react'
import { Login } from './Login'
import { Avatar } from './Avatar'

class Header extends React.Component{
    render() {
        const {title} = this.props;
    
        return (
            <div id="header">
                <h1>{title}</h1>
                <Login />
                <Avatar />
            </div>
        );
    }
}

export default Header;
