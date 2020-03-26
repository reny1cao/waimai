import React, { Component } from 'react';
import './ItemCard.css';

class ItemCard extends Component {
    state = {
        name: this.props.name,
        description: this.props.description,
        price: this.props.price,
        editable: false,
    }

    changeEditMode = () => {
        this.setState({ editable: !this.state.editable });
    }

    handleNameChange = (e) => {
        this.setState({name: e.target.value});
        this.props.editMenuItems(this.props.category, e.target.name, e.target.value, this.props.id);
    }

    handleDescriptionChange = (e) => {
        this.setState({description: e.target.value});
        this.props.editMenuItems(this.props.category, e.target.name, e.target.value, this.props.id);
    }

    handlePriceChange = (e) => {
        this.setState({price: e.target.value});
        this.props.editMenuItems(this.props.category, e.target.name, e.target.value, this.props.id);
    }

    renderEditView = () => {
        return (
            <div className="menu-wrappe">
                <div className="info">
                    <input name="name" type="text" value={this.state.name} onChange={this.handleNameChange}></input>
                    <input name="description" type="text" value={this.state.description} onChange={this.handleDescriptionChange}></input>
                    <input name="price" type="text" value={this.state.price} onChange={this.handlePriceChange}></input>
                </div>
                <button onClick={this.changeEditMode}>Add</button>
            </div>
        )
    }

    renderDefaultView = () => {
        return (
            <div className="menu-wrapper">
                <div className="info">
                    <h4>{this.state.name}</h4>
                    <p>{this.state.description}</p>
                    <p>{this.state.price}</p>
                </div>
                <button onClick={this.changeEditMode}>Edit</button>
            </div>
        )
    }

    render () {

        return (<div className="item-card">
                {this.state.editable ? this.renderEditView() : this.renderDefaultView()}
                <img src={require("../FoodImg/1.jpg")} alt="food img"></img>
            </div>)
        }
}

export default ItemCard;