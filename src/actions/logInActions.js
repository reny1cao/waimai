
export const logInAdmin = page => {
    const account = {
        name: page.state.username,
        pass: page.state.password
    }

    if (account.name === 'admin' && account.pass === 'admin') {
        page.setState({
            errMsg: ""
        })
        window.location.replace("./../AdminView");
    }
    else {
        page.setState({
            errMsg: "Wrong UserName/ Password"
        })
    }
}


export const logInUser = page => {
    const account = {
        name: page.state.username,
        pass: page.state.password
    }

    if (account.name === 'user' && account.pass === 'user') {
        page.setState({
            errMsg:""
        })
        window.location.replace("./../");
    }
    else {
        page.setState({
            errMsg: "Wrong UserName/ Password"
        })
    }
    
}


export const logInRestaurant = page => {
    const account = {
        name: page.state.username,
        pass: page.state.password
    }

    if (account.name === 'user2' && account.pass === 'user2') {
        page.setState({
            errMsg:""
        })
        window.location.replace("./../RestaurantHome");
    }
    else {
        page.setState({
            errMsg: "Wrong UserName/ Password"
        })
    }
}

export const backTrack = page => {

    page.setState({
        userType: "",
        errMsg: ""
    })
    
}
