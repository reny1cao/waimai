export const getCheckBox = (preference) => {
    const signUpPreference = document.getElementsByClassName("sign-up-preference")
    let preferenceList = signUpPreference[0].firstElementChild;

    while (preferenceList!=null){
        let checkBox = preferenceList.firstElementChild.firstElementChild;
        let preferenceText = checkBox.parentElement.innerText;
        if (checkBox.checked === true && !(preference.includes(preferenceText))){
            preference.push(preferenceText);
        } else {
            preference = preference.filter(x=>x=preferenceText)
        }  
        preferenceList = preferenceList.nextElementSibling;
    }
    return preference;

}