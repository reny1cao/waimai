const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: String,
    address: String,
    contactNumber: Number,
    deliveryArea: String,
    preference: String,
    username: String,
    password: String
});

const Customer = mongoose.model('Restaurant', CustomerSchema);

module.exports = { Customer };
