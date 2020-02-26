import React from 'react'
import { Login } from './Login'
import { Avatar } from './Avatar'

export const Header = () => {
    return (
        <div id="header">
            <Login />
            <Avatar />
            <input id="searchBar" type="text" placeholder="Find food or Restaurant"></input>
        </div>
    )
}
