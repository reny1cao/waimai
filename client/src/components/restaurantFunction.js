import { Restaurant } from './Restaurant'
import React from 'react'

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

export const submitFunction = (category) => {
    const nameElement = document.querySelector('#signUpName')
    const name = nameElement.elements[0].value
    const addressElement = document.querySelector('#signUpAddress')
    const address = addressElement.elements[0].value
    const usernameElement = document.querySelector('#signUpUsername')
    const username = usernameElement.elements[0].value
    const passwordElement = document.querySelector('#signUpPassword')
    const password = passwordElement.elements[0].value
    const deliveryAreaElement = document.getElementById('signUpDelivreyArea');
    const deliveryArea = deliveryAreaElement.options[deliveryAreaElement.selectedIndex].text;

    const restaurant = new Restaurant(name, address, deliveryArea, username, password)
    restaurant.catorgory = getCheckBox(category);

    return restaurant
}
