
export const removeUser = (page, user) => {
    const filteredUsers = page.state.customerList.filter(s => {
      return s !== user;
    });
  
  
    page.setState({
        customerList: filteredUsers
    });

    page.baseState.customerList = filteredUsers

    const id = user._id
    let url = "/customer";

    url = url + "/" + id

    const request = new Request(url, {
        method: "delete"
    })

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("could not get customers")
            }
        }).catch(error => {
            console.log(error);
        });
  };



export const removeRestaurant = (page, restaurant) => {
    const filteredRestaurants = page.state.restaurantList.filter(s => {
      return s !== restaurant;
    });
  
  
    page.setState({
        restaurantList: filteredRestaurants
    });

    page.baseState.restaurants = filteredRestaurants
    const id = restaurant._id
    let url = "/restaurant";

    url = url + "/" + id

    const request = new Request(url, {
        method: "delete"
    })

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("could not get restaurants")
            }
        }).catch(error => {
            console.log(error);
        });
};

export const editUser = (page, user, usercomp) => {
    const originalUser = user.username
    const name = page.state.editName
    const username = page.state.editUsername
    const address = page.state.editAddress
    const number = page.state.editNumber
    const preference = page.state.editPref
    if (name !== ''){
    user.name = name
    }
    if (username !== '') {
    user.username = username
    }
    if (address !== '') {
        user.address = address
        }
    if (number !== '') {
        user.contactNumber = number
        }
        if (preference !== '') {
            user.preference = preference
            }

    usercomp.setState({
        editing: false
    })
    const id = user._id
    let url = "/customer";

    url = url + "/" + id
    console.log(JSON.stringify(user))
    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
        
    })

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("could not get customers")
            }
        }).catch(error => {
            user.username = originalUser
            console.log(error);
        });
}

export const editRestaurant = (page, restaurant, restaurantcomp) => {
    const name = page.state.editName
    const originalUser = user.username
    const address = page.state.editAddress
    const username = page.state.editUsername
    const category = page.state.editCategory
    if (name !== ''){
    restaurant.name = name
    }
    if (address !== ''){
        restaurant.address = address
        }
    if (username !== '') {
    restaurant.username = username
    }
    if (category !== '') {
        restaurant.category = category
        }
    restaurantcomp.setState({
        editing: false
    })

    const id = restaurant._id
    let url = "/restaurant";

    url = url + "/" + id
    console.log(JSON.stringify(restaurant))
    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(restaurant),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("could not get restaurants")
            }
        }).catch(error => {
            restaurant.username = originalUser
            console.log(error);
        });
}

export const switchToRestaurants = page => {
    page.setState({view:'restaurants'})
}

export const switchToUsers = page => {
    page.setState({view:"users"})
}

export const searchForName = page => {
    const searchingFor = page.state.searchName

    const filterNames = page.state.customerList.filter(s => {
        return s.name.toLowerCase().indexOf((searchingFor.toLowerCase())) !== -1;
    }
    )

    page.setState({
        customerList: filterNames
    })
}

export const searchForRestaurant = page => {
    const searchingFor = page.state.searchName

    const filterNames = page.state.restaurantList.filter(s => {
        return s.name.toLowerCase().indexOf((searchingFor.toLowerCase())) !== -1;
    }
    )

    page.setState({
        restaurantList: filterNames
    })
}

export const setChange = (thing, comp, value) => {
    thing.area = value
    comp.setState({
        editing: true
    })
}