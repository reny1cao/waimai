import React from 'react'
import Login from './Login'
import { Avatar } from './Avatar'

import "./Header.css";

class Header extends React.Component{
    render() {
        const {title} = this.props;
        const {userState} = this.props;
        
        return (
                <div id="header">
                    <h1>{title}</h1>
                    <Login 
                        text = {userState}
                    />
                    <Avatar />
                </div>
        );

    }
}

export default Header;
