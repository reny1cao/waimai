
export const logInAdmin = page => {
    const account = {
        name: page.state.username,
        pass: page.state.password
    }

    if (account.name === 'admin' && account.pass === 'admin') {
        window.location.replace("./../AdminView");
    }
    
}


export const logInUser = page => {
    const account = {
        name: page.state.username,
        pass: page.state.password
    }

    if (account.name === 'user' && account.pass === 'user') {
        window.location.replace("./../UserView");
    }
    
}


export const logInRestaurant = page => {
    const account = {
        name: page.state.username,
        pass: page.state.password
    }

    if (account.name === 'user2' && account.pass === 'user2') {
        window.location.replace("./../RestaurantView");
    }
}

export const backTrack = page => {

    page.setState({
        userType: ""
    })
    
}