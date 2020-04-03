import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './SignUpPage.css'

export const SignUpPage = () => {
    return (
        <div className="sign-up-card">
            <i class="fas fa-user-plus"></i>
            <Link to = "/customer/sign-Up" className="customer-signup"><Button variant="outline-secondary">Sign up as customer</Button></Link>   
            <Link to = "/restaurant/sign-Up" className="restaurant-signup"><Button variant="outline-secondary">Sign up as restaurant</Button></Link>
        </div>
    )
}
