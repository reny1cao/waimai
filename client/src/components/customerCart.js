import React, { Component } from 'react'
import { getCart } from "../actions/CustomerAction"

class customerCart extends Component {
    
    state={
        customerCart:[]
    }

    componentDidMount = () => {
        getCart(this)
    }

    render() {
        return (
            <div className="cart">
                <h3>Cart</h3>
                {this.state.customerCart.map(item => <p><strong>food:</strong> {item.dishes} <strong>total price:</strong> {item.totalPrice}</p>)}
            </div>
        )
    }
}

export default customerCart
