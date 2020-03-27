const mongoose = require("mongoose");
const { ObjectID } = require('mongodb');

const DishSchema = new mongoose.Schema({
    name: String,
    price: Number,
    amount: Number
})

const OrderSchema = new mongoose.Schema({
    dishes: [DishSchema],
    totalPrice: Number,
    //TODO change to date object
    time: String,
    deliveryAddress: String,
    customerId: ObjectID,
    restarurantId: ObjectID
})

const Order = mongoose.model('Order', OrderSchema);

module.exports = {Order, OrderSchema};