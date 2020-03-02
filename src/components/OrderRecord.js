import React from 'react'
import { Customer } from './Customer'

export const OrderRecord = () => {
    console.log(Customer)
    return (
        <div>
        <h1><strong>ORDERS</strong></h1>
        <h3>Order Number: {Customer.length}</h3>
        {Customer.map(x=>{
            return (
                <div className = "customer-list">
                <h2>name: {x.name}</h2>
                <h2>contact number: {x.contactNumber}</h2>
                <h2>address: {x.address}</h2>
                <h2>order: {x.order}</h2>
                <h3>special requirement: {x.specialRequirement}</h3>
                </div>
            )
        })}
        </div>)
}
