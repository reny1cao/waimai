import React from 'react'
import { Link } from 'react-router-dom'
import { submitFunction } from './restaurantFunction'
import "bootstrap/dist/css/bootstrap.min.css";


export const RestaurantSignUp = () => {
    let category = [];
    let name;
    let deliveryArea;
    let address;
    let username;
    let password;
    return (
        <div>
            <h1>Sign Up</h1>
            <div id = "sign-up">
                <span>Restaurant Name</span>
                <form id = "signUpName">
                    <input id='typeBar' type="text" placeholder="Enter Restaurant Name" />
                </form>
            </div>
            <div id = "sign-up">
                <span>Restaurant Address</span>
                <form id = "signUpAddress">
                    <input id="typeBar" type="text" placeholder="Enter Restaurant Adress" />
                </form>
            </div>
            <div id = "sign-up">
                <span>Restaurant Delivery Area</span>
                <p><select id="typeBar">
                    <option value = "0">UTSG</option>
                    <option value = "1">UTM</option>
                    <option value = "2">UTSC</option>
                    <option value = "3">ALL DOWNTOWN AREA</option>
                </select></p>
            </div>
            <div id = "sign-up">
                <span>Restaurant Category</span>
                <div className="sign-up-category">
                    <p><label>
                        <input type="checkbox" id="myCheck" ></input>Fast food
                    </label></p>
                    <p><label>
                        <input type="checkbox" id="myCheck" ></input>Healthy Food
                    </label></p>
                    <p><label>
                        <input type="checkbox" id="myCheck" ></input>Chinese
                    </label></p>
                    <p><label>
                        <input type="checkbox" id="myCheck" ></input>Thai
                    </label></p>
                    <p><label>
                        <input type="checkbox" id="myCheck" ></input>Canadian
                    </label></p>
                </div>
            </div>
            <div id = "sign-up-info">
                <span>username</span>
                <form id = "signUpUsername">
                    <input id="typeBar" type="text" placeholder="Enter username" />
                </form>
            </div>
            <div id = "sign-up-info">
                <span>password</span>
                <form id = "signUpPassword">
                    <input id="typeBar" type="text" placeholder="Enter password"/>
                </form>
            </div>
            <div id="signup-submit">
                <Link to = "/loginPage"><button id="submit-button" onClick={()=>submitFunction(name,address,deliveryArea,username,password,category)}><h5>Submit</h5></button></Link>
            </div>
        </div>
    )
}



