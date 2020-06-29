export const getCheckBox = (category) => {
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