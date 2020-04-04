const mongoose = require('mongoose');
const { OrderSchema } = require('./order');
const bcrypt = require('bcryptjs');

const ItemSchema = new mongoose.Schema({
    itemName: String,
    description: String,
    price: Number,
    //temporarily
    image: String
})
const CategorySchema = new mongoose.Schema({
    categoryName: String,
    items: [ItemSchema]
})
// const ReviewSchema = new mongoose.Schema({
//     name: String,
//     date: String,
//     rating: 4,
//     comments: String
// })
const RestaurantSchema = new mongoose.Schema({
    name: String,
    address: String,
    deliveryArea: String,
    category: String,
    rating: Number,
    username: {
        type: String,
        required: true,
        minlength: 1,
        unique:true,
    },
    password: {
        type: String,
        required:true,
        minlength:1
    },
    activeOrders: [OrderSchema],
    orderHistory: [OrderSchema],
    menu: [CategorySchema]
    // reviews: [ReviewSchema]
})

RestaurantSchema.pre('save', function(next) {
    const restaurant = this;

    if (restaurant.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(restaurant.password, salt, (err, hash) => {
                restaurant.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

RestaurantSchema.statics.findByUserPassword = function(username, password) {
	const Restaurant = this // binds this to the User model

	// First find the user by their email
	return Restaurant.findOne({ username: username }).then((restaurant) => {
		if (!restaurant) {
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, restaurant.password, (err, result) => {
				if (result) {
					resolve(restaurant)
				} else {
                    console.log(err);
					reject()
				}
			})
		})
	})
}

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = { Restaurant };