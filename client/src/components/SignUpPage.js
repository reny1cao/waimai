import React from 'react'
import { Link } from 'react-router-dom'

export const SignUpPage = () => {
    return (
        <div>
            <p><Link to = "/Customer/SignUp"><button className = "restaurant-home">Sign up as customer</button></Link></p>
            <p><Link to = "/Restaurant/SignUp"><button className = "restaurant-home">Sign up as restaurant</button></Link></p>
        </div>
    )
}
