import React from 'react'
import { Order } from './Order'

export const OrderRecord = () => {
    return (
        <div className = "order-title">
        <h2><strong> ORDERS</strong></h2>
        <h4> Order Number: {Order.length}</h4>
        {Order.map(x=>{
            return (
                <div className = "order-list">
                <h5>name: {x.name}</h5>
                <h5>contact number: {x.contactNumber}</h5>
                <h5>address: {x.address}</h5>
                <h5>order: {x.order}</h5>
                <h5>special requirement: {x.specialRequirement}</h5>
                </div>
            )
        })}
        </div>)
}
