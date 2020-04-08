export const readCookie = (app) => {
    const url = "/check-session";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then( json => {
            if (json && json.currentUser && json.userType) {
                app.setState({currentUser: json.currentUser, userType: json.userType});
            }
        })
        .catch(error => {
            console.log(error);
        })
}

export const login = (loginComp, app, type) => {
    //temp url
    let url = "http://localhost:5000/login";

    if (type === "Restaurant") {
        url += "/restaurant";
    } else if (type === "Admin") {
        url += "/admin"
    }
    
    const request = new Request(url, {
        method:"post",
        body: JSON.stringify(loginComp.state),
        headers: {
            Accept:"application/json, text/plain, */*", 
            "Content-Type": "application/json"
        }
    });
    fetch(request)
    .then(res => {
        if (res.status === 200) {

            return res.json();
        }
    })
    .then(json => {
        if (json.currentUser !== undefined) {
            app.setState({ currentUser: json.currentUser, userType: type})
            if(type === "Restaurant"){
                console.log(loginComp)
                loginComp.props.history.push("/"+type.toLowerCase()+"/"+loginComp.state.restaurant[0]._id);
            }
            if(type === "Customer"){
                loginComp.props.history.push("/Home");
            }
        }
    })
    .catch(error => {
        loginComp.setState({ errMsg: "Wrong Log In Information" });
        console.log(error);
    });
}

// export const logInAdmin = page => {
//     const account = {
//         name: page.state.username,
//         pass: page.state.password
//     }

//     if (account.name === 'admin' && account.pass === 'admin') {
//         page.setState({
//             errMsg: "successfully log in"
//         })
//         window.location.replace("./../AdminView");
//     }
//     else {
//         page.setState({
//             errMsg: "Wrong UserName/ Password"
//         })
//     }
// }


// export const logInUser = page => {
//     const account = {
//         name: page.state.username,
//         pass: page.state.password
//     }

//     if (account.name === 'user' && account.pass === 'user') {
//         page.setState({
//             errMsg:"successfully log in"
//         })
        
//     }
//     else {
//         page.setState({
//             errMsg: "Wrong UserName/ Password"
//         })
//     }
    
// }


// export const logInRestaurant = page => {
//     const account = {
//         name: page.state.username,
//         pass: page.state.password
//     }

//     if (account.name === 'user2' && account.pass === 'user2') {
//         page.setState({
//             errMsg:"successfully log in"
//         })
//         window.location.replace("./../RestaurantHome");
//     }
//     else {
//         page.setState({
//             errMsg: "Wrong UserName/ Password"
//         })
//     }
// }

// export const logInRestaurant = (loginComp, app) => {
    
// }

export const backTrack = page => {

    page.setState({
        userType: "",
        errMsg: ""
    })
    
}

export const logout = (app) => {
    const url = "/logout";
    fetch(url)
        .then(res => {
            app.setState({
            currentUser: null,
            userType: null});
        })
        .catch(error => {
            console.log(error);
        })
}
