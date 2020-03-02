import React from 'react'
import { Link } from 'react-router-dom'

export const SignUpPage = () => {
    return (
        <div>
            <p><button className = "restaurant-home"><Link to = "/Restaurant/SignUp">Sign up as customer</Link></button></p>
            <p><button className = "restaurant-home"><Link to = "/Restaurant/SignUp">Sign up as restaurant</Link></button></p>
        </div>
    )
}
