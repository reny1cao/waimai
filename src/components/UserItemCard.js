import React, { Component } from 'react'

export default class UserItemCard extends Component {

    render () {
        return (<div className="item-card">
                <div className="menu-wrapper">
                <div className="info">
                    <h4>{this.props.name}</h4>
                    <p>{this.props.description}</p>
                    <p>{this.props.price}</p>
                </div>
            </div>
                <button>+</button>
                <img src={require("../FoodImg/1.jpg")} alt="food img"></img>
            </div>)
        }
}
