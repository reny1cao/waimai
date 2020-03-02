
export const removeUser = (page, user) => {
    const filteredUsers = page.state.users.filter(s => {
      return s !== user;
    });
  
  
    page.setState({
      users: filteredUsers
    });
  };

export const removeRestaurant = (page, restaurant) => {
    const filteredRestaurants = page.state.restaurants.filter(s => {
      return s !== restaurant;
    });
  
  
    page.setState({
      restaurants: filteredRestaurants
    });
};

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