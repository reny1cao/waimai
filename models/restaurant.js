const mongoose = require('mongoose');
const { OrderSchema } = require('./order');

const ItemSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    //temporarily
    image: String
})
const CategorySchema = new mongoose.Schema({
    name: String,
    items: [ItemSchema]
})
const RestaurantSchema = new mongoose.Schema({
    name: String,
    address: String,
    deliveryArea: String,
    category: String,
    username: String,
    password: String,
    activeOrders: [OrderSchema],
    orderHistory: [OrderSchema],
    menu: [CategorySchema]
})

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = { Restaurant };