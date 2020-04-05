const mongoose = require("mongoose");
const { ObjectID } = require('mongodb');


const ProductSchema = new mongoose.Schema({
    id: ObjectID,
      name: String,
      restarant_name:String,
      available_quantity: String,
      price: Number,
      img: String,
      description: String

    

})

const Product = mongoose.model('Product', ProductSchema);

module.exports = {Product, ProductSchema};