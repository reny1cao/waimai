const { OrderSchema } = require('./order') ;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const CustomerSchema = new mongoose.Schema({
    name: String,
    address: String,
    contactNumber: String,
    deliveryArea: String,
    preference: Array,
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
            bcrypt.hash(customer.password, salt, (err, hash) => {
                customer.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

CustomerSchema.statics.findByUserPassword = function(username, password) {
	const Customer = this // binds this to the User model
    console.log("in findByUserPassword")
    // First find the user by their email
	return Customer.findOne({ username: username }).then((customer) => {
		if (!customer) {
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, customer.password, (err, result) => {
				if (result) {
					resolve(customer)
				} else {
					reject()
				}
			})
		})
	})
}

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = { Customer };
