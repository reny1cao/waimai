const log = console.log;

// Express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Mongo and Mongoose
const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose');

const { Customer } = require('./models/customer');
const { Order } = require('./models/order');
const { Restaurant } = require('./models/restaurant');


app.get('/', (req, res) => {
    res.send("Api is working");
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
        password: password,
        order:[]
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


app.get('/login-page', (req, res) => {
    const {username, password} = req.body;

    Customer.findOne({username:username}, (err, customer) => {
        if (err) {
            res.status(400).send(err);
        } else {
            if (customer) {
                if (password === customer.password) {
                    //TODO render loged in view
                    res.send(customer);
                } else {
                    res.send("Wrong Password");
                }
            } else {
                res.status(404).send();
            }
        }
    })
})
 
//get all the customers
app.get('/customer', (req,res) => {
    Customer.find().then((customers) => {
        res.send(customers)
    }),(error) => {
        res.status(500).send()
    }
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
			res.send(restaurant)
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
        res.send(restaurants)
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


//add category
app.patch('/restaurant/:id', (req, res) => {
    const id = req.body.id;

    if (!ObjectID.isValid(id)) {
		res.status(404).send("restaurant id not valid")  
		return;  
    }

    const { name } = req.body;

    Restaurant.findById(id).then((restaurant) => {
        if (!restaurant) {
            res.status(404).send();
        } else {
            restaurant.menu.push({ name: name });
            restaurant.save().then((result) => {
                res.send(result);
            }, (error) => {
                res.status(400).send(error);
            });
        }
    })
})

//add item
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

    const { name, description, price, image } = req.body;

    Restaurant.findById(id).then((restaurant) => {
        if (!restaurant) {
            res.status(404).send();
        } else {
            const category = restaurant.menu.id(cateId);

            if (category) {
                category.push({
                    name: name,
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

    const { name } = req.body;

    Restaurant.findById(id).then((restaurant) => {
        if (!restaurant) {
            res.status(404).send();
        } else {
            const category = restaurant.menu.id(cateId);

            if (category) {
                category.name = name;
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

    const { name, description, price, image } = req.body;

    Restaurant.findById(id).then((restaurant) => {
        if (!restaurant) {
            res.status(404).send();
        } else {
            const category = restaurant.menu.id(cateId);

            if (category) {
                const item = category.id(itemId);

                if (item) {
                    item.name = name;
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

app.delete('/restuarants/:id', (req, res) => {
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


