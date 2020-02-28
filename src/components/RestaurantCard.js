import React from 'react'

export const RestaurantCard = (prop) => {
    return (
        <div className="restaurantCard">
            <img src="#" alt="img"></img>
            <h3>{prop.name}</h3>
            <h4>{prop.type}</h4>
            <h4>{prop.rating}</h4>
        </div>
    )
}
