import { Restaurant } from './Restaurant'
import React from 'react'

// const RestaurantList = require('RestaurantList');
// export function addNewRestaurant(name, address, delieveryArea, catogory, username, password){
//     const newRestaurant = new Restaurant(name, address, username, password);
//     newRestaurant.delieveryArea.push(delieveryArea);
//     newRestaurant.category.push();
//     RestaurantList.push(newRestaurant)
// }

const getCheckBox = (category) => {
    const signUpCategory = document.getElementsByClassName("sign-up-category")
    let categoryList = signUpCategory[0].firstElementChild;

    while (categoryList!=null){
        let checkBox = categoryList.firstElementChild.firstElementChild;
        let categoryText = checkBox.parentElement.innerText;
        if (checkBox.checked == true && !(category.includes(categoryText))){
            category.push(categoryText);
        } else {
            category = category.filter(x=>x=categoryText)
        }  
        categoryList = categoryList.nextElementSibling;
    }
    // console.log(category);
    return category;

}

export const submitFunction = (name,address,deliveryArea,username,password,category) => {
    const nameElement = document.querySelector('#signUpName')
    name = nameElement.elements[0].value
    const addressElement = document.querySelector('#signUpAddress')
    address = addressElement.elements[0].value
    const usernameElement = document.querySelector('#signUpUsername')
    username = usernameElement.elements[0].value
    const passwordElement = document.querySelector('#signUpPassword')
    username = passwordElement.elements[0].value

    const restaurant = new Restaurant(name, address, deliveryArea, username, password)
    restaurant.catorgory = getCheckBox(category);
    // this.addRestaurant(restaurant)
    // console.log(addRestaurant)
    console.log("hey")
    return restaurant
    // console.log(restaurant)
}
