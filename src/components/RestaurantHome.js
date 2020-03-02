import React from 'react'
import { Link } from 'react-router-dom'

export const RestaurantHome = () => {
    return (
        <div>
            <p><button className = "restaurant-home"><Link to = "/Restaurant/Menu">Menu</Link></button></p>
            <p><button className = "restaurant-home"><Link to = "/Restaurant/OrderRecord">Orders</Link></button></p>
        </div>
    )
}
