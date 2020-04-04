import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { getCheckBox } from '../restaurantFunction'
import Button from 'react-bootstrap/Button';
import "./SignUpPage.css";
import { updateRestaurantForm,addRestaurant } from '../../actions/RestaurantActions'


class RestaurantSignUp extends Component{
    state={
        name:"",
        address:"",
        deliveryArea:"UTSG",
        category:[],
        username:"",
        password:""
    }

    render(){

        const { name, address, deliveryArea, category, username, password } = this.state;

        return (
            <div className="sign-up-container">
                <div className = "sign-up">
                    <span>Restaurant Name</span>
                    <form id = "signUpName">
                        <input 
                        name = "name" value = {name} onChange={e => updateRestaurantForm(this, e.target)}
                        className='typeBar' type="text" placeholder="Enter Restaurant Name" />
                    </form>
                </div>
                <div className = "sign-up">
                    <span>Restaurant Address</span>
                    <form id = "signUpAddress">
                        <input 
                        name = "address" value = {address} onChange={e => updateRestaurantForm(this, e.target)}
                        className="typeBar" type="text" placeholder="Enter Restaurant Address" />
                    </form>
                </div>
                <div className = "sign-up">
                    <span>Restaurant Delivery Area</span>
                    <p><select 
                    name = "deliveryArea" value = {deliveryArea} onChange={e => updateRestaurantForm(this, e.target)}
                    id="signUpDelivreyArea">
                        <option value = "UTSG">UTSG</option>
                        <option value = "UTM">UTM</option>
                        <option value = "UTSC">UTSC</option>
                        <option value = "ALL DOWNTOWN AREA">ALL DOWNTOWN AREA</option>
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
                <div className = "sign-up">
                    <span>username</span>
                    <form id = "signUpUsername">
                        <input 
                        name = "username" value = {username} onChange={e => updateRestaurantForm(this, e.target)}
                        className="typeBar" type="text" placeholder="Enter username" />
                    </form>
                </div>
                <div className = "sign-up">
                    <span>password</span>
                    <form id = "signUpPassword">
                        <input 
                        name = "password" value = {password} onChange={e => updateRestaurantForm(this, e.target)}
                        className="typeBar" type="text" placeholder="Enter password"/>
                    </form>
                </div>
                <div className="sign-up">
                    <Link to = "/loginPage"><Button variant="outline-secondary" onClick={()=>{getCheckBox(category);addRestaurant(this)}}>Submit</Button></Link>
                </div>
            </div>
        )
    }
    
}



export default RestaurantSignUp;