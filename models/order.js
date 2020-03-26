const mongoose = require("mongoose")

const DishSchema = new mongoose.Schema({
    name: String,
    price: Number
})

const OrderSchema = new mongoose.Schema({
    dishes: [DishSchema],
    totalPrice: Number,
    time: String,
    deliveryAddress: String
})

const Order = mongoose.model('Order', OrderSchema);

module.exports = {Order, OrderSchema};