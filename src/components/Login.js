import React from 'react'
import { Link } from "react-router-dom";

export const Login = () => {
    return (
        <div id="login">
            <Link className="toLogInPageButton" to={"./../logInPage"}>
            <button>Login</button>
            </Link>
            
        </div>
    )
}
