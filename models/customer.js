const { OrderSchema } = require('./order') ;
const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: String,
    address: String,
    contactNumber: Number,
    deliveryArea: String,
    preference: String,
    username: String,
    password: String,
    activeOrders: [OrderSchema],
    orderHistory: [OrderSchema]
});

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = { Customer };
