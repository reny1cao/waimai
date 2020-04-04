import React from 'react';
import { Link } from 'react-router-dom';
import { RestaurantCard } from '../components/RestaurantCard';

// A function to send a GET request to the web server,
// and then loop through them and add a list element for each restaurant
export const getRestaurant = (home) => {
    // the URL for the request
    const url = "/restaurant";

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get restaurant");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            home.setState({ restaurantList: json.restaurantList });
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to update the student form state
export const updateRestaurantForm = (formComp, field) => {
    const value = field.value;
    const name = field.name;

    formComp.setState({
        [name]: value
    });
};

export const addRestaurant = (formComp) => {
    // the URL for the request
    const url = "http://localhost:5000/restaurant/sign-up";

    // The data we are going to send in our request

    const restaurant = formComp.state
    console.log(restaurant)

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(restaurant),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });


    // Send the request with fetch()
    fetch(request)
        // .then(function (res) {
        //     // Handle response we get from the API.
        //     // Usually check the error codes to see what happened.
        //     if (res.status === 200) {
        //         // If student was added successfully, tell the user.
        //         // dashboardComp.setState({
        //         //     message: {
        //         //         body: "Success: Added a Restaurant.",
        //         //         type: "success"
        //         //     }
        //         // });
        //     } else {
        //         // dashboardComp.setState({
        //         //     message: {
        //         //         body: "Error: Could not add restaurant.",
        //         //         type: "error"
        //         //     }
        //         // });
        //     }
        // })
        .catch(error => {
            restaurant.setState({ errMsg: "Wrong Log In Information" })
            console.log(error);
        });
};

export const createRestaurant = (restaurant) => {
    return <Link to={"/menu"}  key={restaurant.id}> <RestaurantCard name={restaurant.name} type={restaurant.category} /> </Link>
}