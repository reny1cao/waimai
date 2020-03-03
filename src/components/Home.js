import React from 'react';
import Header from './Header';
import { RestaurantCard } from './RestaurantCard';
import restaurantData from '../restaurantData';
import { Link } from 'react-router-dom';

function createRestaurant(props) {
    const total = props.reviews.reduce((acc, curr) => {
        return acc + curr.rating;
    }, 0)
    const rating = (parseInt(total)/props.reviews.length).toFixed(1);
//     return <Link to={`/${props.id}`}  key={props.id}><RestaurantCard restImg={props.photograph} name={props.name} type={props.cuisine_type}  rating={rating}/> </Link>
    return <Link to={"/menu"}  key={props.id}><RestaurantCard restImg={props.photograph} name={props.name} type={props.cuisine_type}  rating={rating}/> </Link>
}


export const Home = () => {
    return (
        <div>
            <Header 
                title="WAIMAI"
                userState="Log In"
                userState1="Sign Up"
            />

            <input id="searchBar" type="text" placeholder="Find food or Restaurant"></input>
            <h2>Popular</h2>
            <div className="flex-container">
                {restaurantData.map(createRestaurant)}
            </div>
            <h2>New on Waimai</h2>
            <div className="flex-container">
                {restaurantData.map(createRestaurant)}
            </div>
        </div>
    )
}
