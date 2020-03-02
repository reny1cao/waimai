import React from 'react'
import { onClickFunction } from './restaurantFunction'


export const RestaurantSignUp = () => {
    let category = [];
    return (
        <div>
            <h1>Sign Up</h1>
            <div id = "sign-up">
                <span>Restaurant Name</span>
                <p><input id="typeBar" type="text" placeholder="Enter Restaurant Name"></input></p>
            </div>
            <div id = "sign-up">
                <span>Restaurant Address</span>
                <p><input id="typeBar" type="text" placeholder="Enter Restaurant Adress"></input></p>
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
                        <input type="checkbox" id="myCheck" onClick={() => onClickFunction(category)}></input>Fast food
                    </label></p>
                    <p><label>
                        <input type="checkbox" id="myCheck" onClick={() => onClickFunction(category)}></input>Healthy Food
                    </label></p>
                    <p><label>
                        <input type="checkbox" id="myCheck" onClick={() => onClickFunction(category)}></input>Chinese
                    </label></p>
                    <p><label>
                        <input type="checkbox" id="myCheck" onClick={() => onClickFunction(category)}></input>Thai
                    </label></p>
                    <p><label>
                        <input type="checkbox" id="myCheck" onClick={() => onClickFunction(category)}></input>Canadian
                    </label></p>
                </div>
            </div>
            <div id = "sign-up-info">
                <span>username</span>
                <p><input id="typeBar" type="text" placeholder="Enter username"></input></p>
            </div>
            <div id = "sign-up-info">
                <span>password</span>
                <p><input id="typeBar" type="text" placeholder="Enter password"></input></p>
            </div>
            <div id="signup-submit">
                <button id="submit-button" Onclick><h2>Submit</h2></button>
            </div>
        </div>
    )
}



