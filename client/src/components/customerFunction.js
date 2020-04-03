import React from 'react'
import { Customer } from './Customer'

// const RestaurantList = require('RestaurantList');
// export function addNewRestaurant(name, address, delieveryArea, catogory, username, password){
//     const newRestaurant = new Restaurant(name, address, username, password);
//     newRestaurant.delieveryArea.push(delieveryArea);
//     newRestaurant.category.push();
//     RestaurantList.push(newRestaurant)
// }

export const getCheckBox = (preference) => {
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

