
export const removeUser = (page, user) => {
    const filteredUsers = page.state.users.filter(s => {
      return s !== user;
    });
  
  
    page.setState({
      users: filteredUsers
    });

    page.baseState.users = filteredUsers
  };



export const removeRestaurant = (page, restaurant) => {
    const filteredRestaurants = page.state.restaurants.filter(s => {
      return s !== restaurant;
    });
  
  
    page.setState({
      restaurants: filteredRestaurants
    });

    page.baseState.restaurants = filteredRestaurants
    
};

export const editUser = (page, user, usercomp) => {
    const name = page.state.editName
    const username = page.state.editUsername
    const password = page.state.editPassword
    const address = page.state.editAddress
    const number = page.state.editNumber
    const preference = page.state.editPref
    if (name !== ''){
    user.name = name
    }
    if (username !== '') {
    user.username = username
    }
    if (password !== '') {
    user.password = password
    }
    if (address !== '') {
        user.address = address
        }
    if (number !== '') {
        user.number = number
        }
        if (preference !== '') {
            user.preference = preference
            }

    usercomp.setState({
        editing: false
    })
}

export const editRestaurant = (page, restaurant, restaurantcomp) => {
    const name = page.state.editName
    const address = page.state.editAddress
    const username = page.state.editUsername
    const password = page.state.editPassword
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
    if (password !== '') {
    restaurant.password = password
    }
    if (category !== '') {
        restaurant.category = category
        }
    restaurantcomp.setState({
        editing: false
    })
}

export const switchToRestaurants = page => {
    page.setState({
        view: "restaurants"
    })
}

export const switchToUsers = page => {
    page.setState({
        view: "users"
    })
}

export const searchForName = page => {
    const searchingFor = page.state.searchName

    const filterNames = page.state.users.filter(s => {
        return s.name.toLowerCase().indexOf((searchingFor.toLowerCase())) !== -1;
    }
    )

    page.setState({
        users: filterNames
    })
}

export const searchForRestaurant = page => {
    const searchingFor = page.state.searchName

    const filterNames = page.state.restaurants.filter(s => {
        return s.name.toLowerCase().indexOf((searchingFor.toLowerCase())) !== -1;
    }
    )

    page.setState({
        restaurants: filterNames
    })
}

