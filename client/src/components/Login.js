import React from 'react'
import { Link } from "react-router-dom";

class Login extends React.Component {

    render() {
        const {text} = this.props;
        return (
            <div id="login">
                <Link className="toLogInPageButton" to={"./../logInPage"}>
                <button>{text}</button>
                </Link>
                
            </div>
        )
    
    }
}
export default Login;
    
