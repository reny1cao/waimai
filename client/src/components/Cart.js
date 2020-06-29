import React, { Component } from "react";
import "./Cart.css";

export default class Cart extends Component {
  render() {
    return (
      <div className="cart">
        <h3>Cart</h3>
        {this.props.location.state.cart.map((item) => (
          <p>
            <strong>food:</strong> {item.name} <strong>price:</strong>{" "}
            {item.price}
          </p>
        ))}
      </div>
    );
  }
}
