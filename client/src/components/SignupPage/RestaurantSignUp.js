import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { submitFunction } from '../restaurantFunction'
import Button from 'react-bootstrap/Button';
import "./SignUpPage.css";


class RestaurantSignUp extends Component{
    state={
        category : [],
        deliveryArea:[],
    }

    render(){
        return (
            <div className="sign-up-container">
                <div className = "sign-up">
                    <span>Restaurant Name</span>
                    <form className = "signUpName">
                        <input className='typeBar' type="text" placeholder="Enter Restaurant Name" />
                    </form>
                </div>
                <div className = "sign-up">
                    <span>Restaurant Address</span>
                    <form className = "signUpAddress">
                        <input className="typeBar" type="text" placeholder="Enter Restaurant Adress" />
                    </form>
                </div>
                <div className = "sign-up">
                    <span>Restaurant Delivery Area</span>
                    <p><select className="signUpDelivreyArea">
                        <option value = "0">UTSG</option>
                        <option value = "1">UTM</option>
                        <option value = "2">UTSC</option>
                        <option value = "3">ALL DOWNTOWN AREA</option>
                    </select></p>
                </div>
                <div className = "sign-up">
                    <span>Restaurant Category</span>
                    <div className="sign-up-category">
                        <p><label>
                            <input type="checkbox" className="myCheck" ></input>Fast food
                        </label></p>
                        <p><label>
                            <input type="checkbox" className="myCheck" ></input>Healthy Food
                        </label></p>
                        <p><label>
                            <input type="checkbox" className="myCheck" ></input>Chinese
                        </label></p>
                        <p><label>
                            <input type="checkbox" className="myCheck" ></input>Thai
                        </label></p>
                        <p><label>
                            <input type="checkbox" className="myCheck" ></input>Canadian
                        </label></p>
                    </div>
                </div>
                <div className = "sign-up-info">
                    <span>username</span>
                    <form className = "signUpUsername">
                        <input className="typeBar" type="text" placeholder="Enter username" />
                    </form>
                </div>
                <div className = "sign-up-info">
                    <span>password</span>
                    <form className = "signUpPassword">
                        <input className="typeBar" type="text" placeholder="Enter password"/>
                    </form>
                </div>
                <div className="signup-submit">
                    <Link to = "/loginPage"><Button variant="outline-secondary" onClick={()=>this.props.addRestaurant(submitFunction(this.state.category))}>Submit</Button></Link>
                </div>
            </div>
        )
    }
    
}



export default RestaurantSignUp;