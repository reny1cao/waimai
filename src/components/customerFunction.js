import React from 'react'
import { Customer } from './Customer'

// const RestaurantList = require('RestaurantList');
// export function addNewRestaurant(name, address, delieveryArea, catogory, username, password){
//     const newRestaurant = new Restaurant(name, address, username, password);
//     newRestaurant.delieveryArea.push(delieveryArea);
//     newRestaurant.category.push();
//     RestaurantList.push(newRestaurant)
// }

const getCheckBox = (preference) => {
    const signUpPreference = document.getElementsByClassName("sign-up-preference")
    let preferenceList = signUpPreference[0].firstElementChild;

    while (preferenceList!=null){
        let checkBox = preferenceList.firstElementChild.firstElementChild;
        let preferenceText = checkBox.parentElement.innerText;
        if (checkBox.checked == true && !(preference.includes(preferenceText))){
            preference.push(preferenceText);
        } else {
            preference = preference.filter(x=>x=preferenceText)
        }  
        preferenceList = preferenceList.nextElementSibling;
    }
    return preference;

}

export const submitFunction = (preference) => {
    const nameElement = document.querySelector('#signUpName')
    const name = nameElement.elements[0].value
    const addressElement = document.querySelector('#signUpAddress')
    const address = addressElement.elements[0].value
    const contactElement = document.querySelector('#signUpContact')
    const contactNumber = contactElement.elements[0].value
    const usernameElement = document.querySelector('#signUpUsername')
    const username = usernameElement.elements[0].value
    const passwordElement = document.querySelector('#signUpPassword')
    const password = passwordElement.elements[0].value
    const deliveryAreaElement = document.getElementById('signUpDelivreyArea');
    const deliveryArea = deliveryAreaElement.options[deliveryAreaElement.selectedIndex].text;


    const customer = new Customer(name, address, deliveryArea, contactNumber, username, password)
    customer.preference = getCheckBox(preference)
    return customer
}