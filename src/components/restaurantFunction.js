import { Restaurant } from './Restaurant'
import React from 'react'

// const RestaurantList = require('RestaurantList');
// export function addNewRestaurant(name, address, delieveryArea, catogory, username, password){
//     const newRestaurant = new Restaurant(name, address, username, password);
//     newRestaurant.delieveryArea.push(delieveryArea);
//     newRestaurant.category.push();
//     RestaurantList.push(newRestaurant)
// }

export const onClickFunction = (category) => {
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
    console.log(category);
}
