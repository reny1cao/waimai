const mongoose = require('mongoose');
const { OrderSchema } = require('./order');
const bcrypt = require('bcrpytjs');

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
const RestaurantSchema = new mongoose.Schema({
    name: String,
    address: String,
    deliveryArea: String,
    category: String,
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
	const User = this // binds this to the User model

	// First find the user by their email
	return User.findOne({ username: username }).then((user) => {
		if (!user) {
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user)
				} else {
					reject()
				}
			})
		})
	})
}

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = { Restaurant };