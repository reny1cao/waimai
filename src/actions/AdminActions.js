
export const removeUser = page => {
    const account = {
        name: page.state.username,
        pass: page.state.password
    }

    if (account.name === 'admin' && account.pass === 'admin') {
        window.location.replace("./../AdminView");
    }
    else if (account.name === 'user' && account.pass === 'user') {
        window.location.replace("./../UserView");
    }
    else if (account.name === 'user2' && account.pass === 'user2') {
        window.location.replace("./../RestaurantView");
    }
}

// export const chooseUser = page => {

//     page.setState({
//         userType: page.props.text
//     })
// }
