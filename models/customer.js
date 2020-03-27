const { OrderSchema } = require('./order') ;
const mongoose = require('mongoose');
const bcrypt = require('bcrpytjs');

const CustomerSchema = new mongoose.Schema({
    name: String,
    address: String,
    contactNumber: Number,
    deliveryArea: String,
    preference: String,
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
    orderHistory: [OrderSchema]
});

CustomerSchema.pre('save', function(next) {
    const customer = this;

    if (customer.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

CustomerSchema.statics.findByUserPassword = function(username, password) {
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

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = { Customer };
