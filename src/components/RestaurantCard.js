import React from 'react'

export const RestaurantCard = (prop) => {
    function handleClick(e) {
        e.preventDefault();
        console.log('clicked');
    }

    return (
        <div className="restaurantCard">
            <img src={prop.restImg} alt="img"></img>
            <h4>{prop.name}</h4>
            <p>{prop.type}</p>
            <p>{prop.rating}</p>
        </div>
    )
}
