const mongoose = require('mongoose');
const { OrderSchema } = require('./order');

const RestaurantSchema = new mongoose.Schema({
    name: String,
    address: String,
    deliveryArea: String,
    category: String,
    username: String,
    password: String,
    activeOrders: [OrderSchema],
    orderHistory: [OrderSchema]
})

const Restaurant = new mongoose.model('Restaurant', RestaurantSchema);

module.exports = { Restaurant };