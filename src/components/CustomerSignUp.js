import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { submitFunction } from './customerFunction'


class CustomerSignUp extends Component{
    state={
        preference : [],
    }

    render(){
        return (
            <div>
                <h1>Sign Up</h1>
                <div id = "sign-up">
                    <span>Name</span>
                    <form id = "signUpName">
                        <input id='typeBar' type="text" placeholder="Enter Name" />
                    </form>
                </div>
                <div id = "sign-up">
                    <span>Address</span>
                    <form id = "signUpAddress">
                        <input id="typeBar" type="text" placeholder="Enter Adress" />
                    </form>
                </div>
                <div id = "sign-up">
                    <span>Contact Number</span>
                    <form id = "signUpContact">
                        <input id="typeBar" type="text" placeholder="Enter Contact Number" />
                    </form>
                </div>
                <div id = "sign-up">
                    <span>Delivery Area</span>
                    <p><select id="signUpDelivreyArea">
                        <option value = "0">UTSG</option>
                        <option value = "1">UTM</option>
                        <option value = "2">UTSC</option>
                        <option value = "3">ALL DOWNTOWN AREA</option>
                    </select></p>
                </div>
                <div id = "sign-up">
                    <span>Preference</span>
                    <div className="sign-up-preference">
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
                    <Link to = "/loginPage"><button id="submit-button" onClick = {()=>this.props.addCustomer(submitFunction(this.state.preference))}><h5>Submit</h5></button></Link>
                </div>
            </div>
        )
    }

}

export default CustomerSignUp;
