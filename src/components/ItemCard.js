import React, { useState } from 'react';
import {updateMenu} from '../restDataWithMenu';
import './ItemCard.css';

export const ItemCard = (props) => {
    const [name, setFoodName] = useState(props.name);
    const [description, setDescription] = useState(props.description);
    const [price, setPrice] = useState(props.price);
    const [editMode, setEditMode] = useState(false);
    // const [img, setImg] = useState();

    function changeEditMode(e) {
        setEditMode(!editMode);
    }
    function handleChange(e) {
        e.preventDefault();
        setFoodName(e.target.value);
        // console.log(e.target.value);
    }

    function renderEditView() {
        return (
            <div className="menu-wrappe">
                <div className="info">
                    <input name="name" type="text" defaultValue={name} onChange={handleChange}></input>
                    <input name="description" type="text" defaultValue={description}></input>
                    <input name="price" type="text" defaultValue={price}></input>
                </div>
                <button onClick={changeEditMode}>Save</button>
            </div>
        )
    }

    function renderDefaultView() {
        return (
            <div className="menu-wrapper">
                <div className="info">
                    <h4>{name}</h4>
                    <p>{description}</p>
                    <p>{price}</p>
                </div>
                {/* <img src={require(props.images)} alt="food img"></img> */}
                <button onClick={changeEditMode}>Edit</button>
            </div>
        )
    }

    return (<div className="item-card">
                {editMode ? renderEditView() : renderDefaultView()}
                <img src={require("../FoodImg/1.jpg")} alt="food img"></img>
            </div>)
}

