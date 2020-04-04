import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getCheckBox } from '../customerFunction'
import Button from 'react-bootstrap/Button';
import "./SignUpPage.css";
import { updateCustomerForm, addCustomer } from '../../actions/CustomerAction';


class CustomerSignUp extends Component{
    state={
        name:"",
        address:"",
        contactNumber:"",
        deliveryArea:"UTSG",
        preference:[],
        username:"",
        password:""
    }

    render(){

        const { dashboard } = this.props;

        const { name, address, deliveryArea, contactNumber, preference, username, password } = this.state;

        return (
            <div className="sign-up-container">
                <div className = "sign-up">
                    <span>Name</span>
                    <form id = "signUpName">
                        <input 
                        name = "name" value = {name} onChange={e => updateCustomerForm(this, e.target)}
                        className='typeBar' type="text" placeholder="Enter Name" />
                    </form>
                </div>
                <div className = "sign-up">
                    <span>Address</span>
                    <form id = "signUpAddress">
                        <input 
                        name = "address" value = {address} onChange={e => updateCustomerForm(this, e.target)}
                        className="typeBar" type="text" placeholder="Enter Adress" />
                    </form>
                </div>
                <div className = "sign-up">
                    <span>Contact Number</span>
                    <form id = "signUpContact">
                        <input 
                        name = "contactNumber" value = {contactNumber} onChange={e => updateCustomerForm(this, e.target)}
                        className="typeBar" type="text" placeholder="Enter Contact Number" />
                    </form>
                </div>
                <div className = "sign-up">
                    <span>Delivery Area</span>
                    <p><select 
                    name = "deliveryArea" value = {deliveryArea} onChange={e => updateCustomerForm(this, e.target)}
                    id="signUpDelivreyArea">
                        <option value = "UTSG">UTSG</option>
                        <option value = "UTM">UTM</option>
                        <option value = "UTSC">UTSC</option>
                        <option value = "ALL DOWNTOWN AREA">ALL DOWNTOWN AREA</option>
                    </select></p>
                </div>
                <div className = "sign-up">
                    <span>Preference</span>
                    <div className="sign-up-preference">
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
                        name = "username" value = {username} onChange={e => updateCustomerForm(this, e.target)}
                        className="typeBar" type="text" placeholder="Enter username" />
                    </form>
                </div>
                <div className = "sign-up">
                    <span>password</span>
                    <form id = "signUpPassword">
                        <input 
                        name = "password" value = {password} onChange={e => updateCustomerForm(this, e.target)}
                        className="typeBar" type="text" placeholder="Enter password"/>
                    </form>
                </div>
                <div className="sign-up">
                    <Link to = "/loginPage"><Button variant="outline-secondary" onClick = {()=>{getCheckBox(preference); addCustomer(this, dashboard)}}>Submit</Button></Link>
                </div>
            </div>
        )
    }

}

export default CustomerSignUp;
