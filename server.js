const log = console.log;

// Express
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

// Mongo and Mongoose
const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose');
mongoose.set('useFindAndModify', false);

const { Customer } = require('./models/customer');
const { Admin } = require('./models/admin');
const { Order } = require('./models/order');
const { Restaurant } = require('./models/restaurant');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const session = require("express-session");
app.use(bodyParser.urlencoded({extended: true}));

app.use(
    session({
        secret: "oursecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        }
    })
);

app.get('/', (req, res) => {
    res.send("Api is working");
})


// Posting an admin

app.post('/admin', (req, res) => {
    const {username, password} = req.body;
    const admin = new Admin({
        username: username,
        password: password
    })

    admin.save().then(
        result => {
            res.send(result);
        },
        error => {
            res.status(400).send(error);
        }
    )
})

/* Customer resource routes */

app.post('/customer/sign-up', (req, res) => {
    
    const {name, address, contactNumber, deliveryArea, preference, username, password} = req.body;
    const customer = new Customer({
        name: name,
        address: address,
        contactNumber: contactNumber,
        deliveryArea: deliveryArea,
        preference: preference,
        username: username,
        password: password
    });

    customer.save().then(
        result => {
            res.send(result);
        },
        error => {
            res.status(400).send(error);
        }
    )
})


// app.get('/login-page', (req, res) => {
//     const {username, password} = req.body;

//     Customer.findOne({username:username}, (err, customer) => {
//         if (err) {
//             res.status(400).send(err);
//         } else {
//             if (customer) {
//                 if (password === customer.password) {
//                     //TODO render loged in view
//                     res.send(customer);
//                     req.session.user = 
//                 } else {
//                     res.send("Wrong Password");
//                 }
//             } else {
//                 res.status(404).send();
//             }
//         }
//     })
// })

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;


    Customer.findByUserPassword(username, password)
        .then(customer => {
            req.session.customer = customer._id;
            req.session.username = customer.username;
            res.send({ currentUser: customer.username});
        })
        .catch(error => {
            res.status(400).send()
        })
})

 
//get all the customers

app.get('/customer',(req,res) => {
    Restaurant.find().then((customers) => {
        res.send({customerList : customers});
    },(error) => {
        res.status(500).send()
    })
})

app.get('/customer/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
		res.status(404).send()  
		return;  
    }
    
	Customer.findById(id).then((customer) => {
		if (!customer) {
			res.status(404).send()  
		} else {
			res.send(customer)
		}
	}).catch((error) => {
		res.status(500).send() 
	})
})



//Save newly created order to customer, order, restaurant
//bug if we cant find restaurant, order will still be added to customer
app.post('/customer/:id/cart', (req, res) => {
    const customerId = req.params.id;
    const { dishes, totalPrice, time, deliveryAddress, restaurantIdStr} = req.body;

    if (!ObjectID.isValid(customerId)) {
		res.status(404).send("customer id not valid")  
		return;  
    }

const restaurantId = ObjectID(restaurantIdStr);

    if (!ObjectID.isValid(restaurantId)) {
		res.status(404).send("restaurant id not valid")  
		return;  
    }

    const orderInfo = {
        dishes: dishes,
        totalPrice: totalPrice,
        time: time,
        deliveryAddress: deliveryAddress,
        customerId: customerId,
        restaurantId: restaurantId
    }

    Customer.findById(customerId).then((customer) => {
		if (!customer) {
			res.status(404).send("customer not found")  
		} else {
            customer.activeOrders.push(orderInfo);
            customer.save();
		}
	}).catch((error) => {
		res.status(500).send() 
    })

    //Cannot set headers after they are sent to the client
    Restaurant.findById(restaurantId).then((restaurant) => {

		if (!restaurant) {
			res.status(404).send("restaurant not found")  
		} else {
            restaurant.activeOrders.push(orderInfo);
            //maybe when order is completed and then add to order history
            // restaurant.orderHistory.push(orderInfo);
            restaurant.save().then(
                result => {
                    res.send(result);
                },
                error => {
                    res.status(400).send(error);
                }
            )
		}
	}).catch((error) => {
		res.status(500).send() 
    })

    const order = new Order(orderInfo);

    order.save().then(
        result => {
            res.send(result);
        },
        error => {
            res.status(400).send(error);
        }
    );
})

app.patch('/customer/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    if (!ObjectID.isValid(id)) {
		res.status(404).send("customer id not valid")  
		return;  
    }

    const {name, address, contactNumber, deliveryArea, preference, username, password} = req.body;

    Customer.findById(id).then((customer) => {
        if (!customer) {
            res.status(404).send();
        } else {
            customer.menu.push({ 
                name: name,
                address: address,
                contactNumber: contactNumber,
                deliveryArea: deliveryArea,
                preference: preference,
                username: username,
                password: password });
            customer.save().then((result) => {
                res.send(result);
            }, (error) => {
                res.status(400).send(error);
            });
        }
    })
})


app.delete('/customer/:id', (req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;
	}

	Restaurant.findByIdAndRemove(id).then((customer) => {
		if (!customer) {
			res.status(404).send()
		} else {   
			res.send(customer)
		}
	}).catch((error) => {
		res.status(500).send() 
	})
})

// Route to log in and create session
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    console.log(username, password, "C")

    Customer.findByUserPassword(username, password)
        .then(customer => {
            req.session.customer = customer._id;
            req.session.username = customer.username;
            res.send({ currentUser: customer.username, userType: "Customer"});
        })
        .catch(error => {
            res.status(400).send()
        })
})

app.post('/login/restaurant', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    console.log(username, password, "R")

    Restaurant.findByUserPassword(username, password)
        .then(restaurant => {
            req.session.restaurant= restaurant._id;
            req.session.username = restaurant.username;
            res.send({ currentUser: restaurant.username, userType: "Restaurnt"});
        })
        .catch(error => {
            res.status(400).send()
        })
})

app.post('/login/admin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    console.log(username, password, "A")

    Admin.findByUserPassword(username, password)
        .then(admin => {
            req.session.admin= admin._id;
            req.session.username = admin.username;
            res.send({ currentUser: admin.username, userType: "Admin"});
        })
        .catch(error => {
            res.status(400).send()
        })
})

//Route to log out a customer
app.get("/logout", (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    })
})

// Route to check if logged in as customer
app.get("/check-session", (req, res) => {
    if (req.session.admin) {
        res.send({currentUser: req.session.username, userType : "Admin"});
    } else if (req.session.customer) {
        res.send({currentUser: req.session.username, userType : "Customer"});
    } else if (req.session.restaurant) {
        res.send({currentUser: req.session.username, userType : "Restaurant"});
    }{
        res.status(401).send();
    }
});

/* Restaurant resource routes */

app.post('/restaurant/sign-up', (req, res) => {
    const {name, address, deliveryArea, category, username, password} = req.body;

    const restaurant = new Restaurant({
        name: name,
        address: address,
        deliveryArea: deliveryArea,
        category: category,
        username: username,
        password: password
    });
    console.log(restaurant)

    restaurant.save().then(
        result => {
            res.send(result);
        },
        error => {
            res.status(400).send(error);
        }
    )
})


//get one restaurant
app.get('/restaurant/:id',(req,res) => {
    const id = req.params.id

    if(!ObjectID.isValid(id)){
		res.status(404).send()
		return;
    }

    Restaurant.findById(id).then((restaurant)=>{
		if(!restaurant){
			res.status(404).send()
		}
		else{
			res.send({currRestaurant : restaurant});
		}
	}).catch((error)=>{
		res.status(500).send()
	})
})

//get all the orders for the restaurant
app.get('/restaurant/:id/order', (req,res) => {
    const id = req.params.id

	if(!ObjectID.isValid(id)){
		res.status(404).send()
		return;
	}

	Restaurant.findById(id).then((restaurant)=>{
		if(!restaurant){
			res.status(404).send()
		}
		else{
			res.send(restaurant.activeOrders)
		}
	}).catch((error)=>{
		res.status(500).send()
	})
})

//get all the restaurant
app.get('/restaurant',(req,res) => {
    Restaurant.find().then((restaurants) => {
        res.send({restaurantList : restaurants});
    },(error) => {
        res.status(500).send()
    })
})


//get the specific order
app.get('/restaurant/:id/order/:order_id', (req,res) => {
    const id = req.params.id
    const oid = req.params.order_id

	if(!ObjectID.isValid(id)){
		res.status(404).send()
		return;
    }
    
    if(!ObjectID.isValid(oid)){
        res.status(404).send()
        return;
    }

	Restaurant.findById(id).then((restaurant)=>{
		if(!restaurant){
			res.status(404).send()
		}
		else{
			res.send(restaurant.activeOrders.id(oid))
		}
	}).catch((error)=>{
		res.status(500).send()
	})
})

// change restaurant admin info
app.patch('/restaurant/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    if (!ObjectID.isValid(id)) {
		res.status(404).send("restaurant id not valid")  
		return;  
    }

    const {name, address, deliveryArea, category, username, password} = req.body;

    Restaurant.findById(id).then((restaurant) => {
        if (!restaurant) {
            res.status(404).send();
        } else {
            restaurant.menu.push({ 
                name: name,
                address: address,
                deliveryArea: deliveryArea,
                category: category,
                username: username,
                password: password });
            restaurant.save().then((result) => {
                res.send(result);
            }, (error) => {
                res.status(400).send(error);
            });
        }
    })
})

//add category
app.patch('/restaurant/:id/add-category', (req, res) => {
    const id = req.params.id;
    console.log(id);
    if (!ObjectID.isValid(id)) {
		res.status(404).send("restaurant id not valid")  
		return;  
    }

    const { categoryName } = req.body;

    Restaurant.findById(id).then((restaurant) => {
        if (!restaurant) {
            res.status(404).send();
        } else {
            restaurant.menu.push({ categoryName: categoryName });
            restaurant.save().then((result) => {
                res.send(result);
            }, (error) => {
                res.status(400).send(error);
            });
        }
    })
})

//add item
app.patch('/restaurant/:id/:cate_id/add-item', (req, res) => {
    const id = req.params.id;
    const cateId = req.params.cate_id;

    if (!ObjectID.isValid(id)) {
		res.status(404).send("restaurant id not valid")  
		return;  
    }

    if (!ObjectID.isValid(cateId)) {
		res.status(404).send("category id not valid")  
		return;  
    }

    const { itemName, description, price, image } = req.body;

    Restaurant.findById(id).then((restaurant) => {
        if (!restaurant) {
            res.status(404).send();
        } else {
            const category = restaurant.menu.id(cateId);

            if (category) {
                category.items.push({
                    itemName: itemName,
                    description: description,
                    price: price,
                    image: image
                })
                restaurant.save().then((result) => {
                    res.send(result);
                }, (error) => {
                    res.status(400).send(error);
                });
            } else {
                res.status(404).send()
            }
        }
    })
})

//edit category name
app.patch('/restaurant/:id/:cate_id', (req, res) => {

    const id = req.params.id;
    const cateId = req.params.cate_id;


    if (!ObjectID.isValid(id)) {
		res.status(404).send("restaurant id not valid")  
		return;  
    }

    if (!ObjectID.isValid(cateId)) {
		res.status(404).send("category id not valid")  
		return;  
    }

    const { categoryName } = req.body;

    Restaurant.findById(id).then((restaurant) => {
        if (!restaurant) {
            res.status(404).send();
        } else {
            const category = restaurant.menu.id(cateId);

            if (category) {
                category.categoryName = categoryName;
                restaurant.save().then((result) => {
					res.send(result);
				}, (error) => {
					res.status(400).send(error);
				});
            } else {
                res.status(404).send()
            }
        }
    })
})

//edit menu item
app.patch('/restaurant/:id/:cate_id/:item_id', (req, res) => {

    const id = req.params.id;
    const cateId = req.params.cate_id;
    const itemId = req.params.item_id;

    if (!ObjectID.isValid(id)) {
		res.status(404).send("restaurant id not valid")  
		return;  
    }

    if (!ObjectID.isValid(cateId)) {
		res.status(404).send("category id not valid")  
		return;  
    }

    if (!ObjectID.isValid(itemId)) {
		res.status(404).send("item id not valid")  
		return;  
    }

    const { itemName, description, price, image } = req.body;

    Restaurant.findById(id).then((restaurant) => {
        if (!restaurant) {
            res.status(404).send();
        } else {
            const category = restaurant.menu.id(cateId);
            console.log(category);
            if (category) {
                const item = category.items.id(itemId);

                if (item) {
                    item.itemName = itemName;
                    item.description = description;
                    item.price = price;
                    item.image = image;

                    restaurant.save().then((result) => {
                        res.send(result);
                    }, (error) => {
                        res.status(400).send(error);
                    });
                } else {
                    res.status(404).send()
                }

            } else {
                res.status(404).send()
            }
        }
    })
})

app.delete('/restaurant/:id', (req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;
	}

	Restaurant.findByIdAndRemove(id).then((restaurant) => {
		if (!restaurant) {
			res.status(404).send()
		} else {   
			res.send(restaurant)
		}
	}).catch((error) => {
		res.status(500).send()
	})
})

app.delete('/restaurant/:id/order/:order_id',(req,res) => {
    const id = req.params.id
    const oid = req.params.order_id

	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;
    }
    
    if (!ObjectID.isValid(oid)) {
		res.status(404).send()
		return;
	}

	Restaurant.findById(id).then((restaurant) => {
		if (!restaurant) {
			res.status(404).send()
		} else {   
            restaurant.activeOrders.remove(restaurant.activeOrders.id(oid))
            restaurant.save().then((result) => {
				res.send(result)
			}, (error) => {
				res.status(400).send(error) 
            })
		}
	}).catch((error) => {
		res.status(500).send()
	})
})





/*** Webpage routes below **********************************/

//TODO render each page, connect to client
// Serve the build
app.use(express.static(__dirname + "/client/build"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
});





/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
});


