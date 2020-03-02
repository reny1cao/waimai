import React from 'react';

import { Link } from 'react-router-dom';
export const logIn = page => {
    const account = {
        name: page.state.username,
        pass: page.state.password
    }

    if (account.name === 'admin' && account.pass === 'admin') {
        return <Link to={("./../AdminView")}></Link>
    }
    else if (account.name === 'user' && account.pass === 'user') {
        window.location.replace("./../UserView");
    }
    else if (account.name === 'user2' && account.pass === 'user2') {
        window.location.replace("./../RestaurantView");
    }
}

export const chooseUser = page => {

    // page.setState({
    //     userType: this.event
    // })
}
