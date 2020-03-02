import React, { useState } from 'react'

export const ItemCard = (props) => {
    const [foodName, setFoodName] = useState(props.name);
    const [description, setDescription] = useState(props.description);
    const [price, setPrice] = useState(props.price);
    const [editMode, setEditMode] = useState(false);
    // const [img, setImg] = useState();

    function changeEditMode(e) {
        setEditMode(!editMode);
        console.log(e.target.value)
    }
    function handleChange(e) {
        e.preventDefault();
        // console.log(e.target.value);
    }

    function renderEditView() {
        return (
            <div className="item-card">
                <div className="info">
                    <input name="foodName" type="text" defaultValue={foodName} onChange={handleChange}></input>
                    <textarea name="description" type="text" defaultValue={description}></textarea>
                    <input name="price" type="text" defaultValue={price}></input>
                </div>
                <img src="#" alt="food img"></img>
                <button onClick={changeEditMode}>Save</button>
            </div>
        )
    }

    function renderDefaultView() {
        return (
            <div className="item-card">
                <div className="info">
                    <h4>{foodName}</h4>
                    <p>{description}</p>
                    <p>{price}</p>
                </div>
                <img src="#" alt="food img"></img>
                <button onClick={changeEditMode}>Edit</button>
            </div>
        )
    }

    return (editMode ? renderEditView() : renderDefaultView())
}

