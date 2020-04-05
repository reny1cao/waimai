const log = console.log;

// Express
const express = require('express');
const app = express();
const cors = require('cors');
const data = require('./data');
app.use(cors());

// Mongo and Mongoose
const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose');
mongoose.set('useFindAndModify', false);

// import the mongoose model
const { Image } = require("./models/image");
// multipart middleware: allows you to access uploaded file from req.file
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dcpucffij',
    api_key: '114281349717277',
    api_secret: '6CXoztRMdZvgrCR3g7A_Se8jagw'
});


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
    res.redirect('/Home');
})

// Middleware for authentication of resources
const authenticateCustomer = (req, res, next) => {
	if (req.session.customer) {
		Customer.findById(req.session.customer).then((customer) => {
			if (!customer) {
				return Promise.reject()
			} else {
				req.customer = customer
				next()
			}
		}).catch((error) => {
			res.status(401).send("Unauthorized")
		})
	} else {
		res.status(401).send("Unauthorized")
	}
}

const authenticateAdmin = (req, res, next) => {
	if (req.session.admin) {
		Admin.findById(req.session.admin).then((admin) => {
			if (!admin) {
				return Promise.reject()
			} else {
				req.admin = admin
				next()
			}
		}).catch((error) => {
			res.status(401).send("Unauthorized")
		})
	} else {
		res.status(401).send("Unauthorized")
	}
}

const authenticateRestaurant = (req, res, next) => {
	if (req.session.restaurant) {
		Restaurant.findById(req.session.restaurant).then((restaurant) => {
			if (!restaurant) {
				return Promise.reject()
			} else {
				req.restaurant = restaurant
				next()
			}
		}).catch((error) => {
			res.status(401).send("Unauthorized")
		})
	} else {
		res.status(401).send("Unauthorized")
	}
}

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

app.get('/customer', (req,res) => {
    Customer.find().then((customers) => {
        res.send({customerList : customers});
    },(error) => {
        res.status(500).send()
    })
})

app.get('/customer/:id/cart', authenticateCustomer, (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
		res.status(404).send()  
		return;  
    }
    
	Customer.findById(id).then((customer) => {
		if (!customer) {
			res.status(404).send()  
		} else {
			res.send({customerCart: customer.activeOrders})
		}
	}).catch((error) => {
		res.status(500).send() 
	})
})



//Save newly created order to customer, order, restaurant
//bug if we cant find restaurant, order will still be added to customer
app.post('/customer/:id/cart', authenticateCustomer, (req, res) => {
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

app.patch('/customer/:id', authenticateAdmin, (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
		res.status(404).send("customer id not valid")  
		return;  
    }

    const {name, address, contactNumber, deliveryArea, preference, username, password} = req.body;

    Customer.findById(id).then((customer) => {
        if (!customer) {
            res.status(404).send();
        } else {
            customer.name = name;
            customer.address = address;
            customer.contactNumber = contactNumber;
            customer.deliveryArea = deliveryArea;
            customer.preference = preference;
            customer.username = username;
            customer.password = password;
            customer.save().then((result) => {
                res.send(result);
            }, (error) => {
                res.status(400).send(error);
            });
        }
    })
})


app.delete('/customer/:id', authenticateAdmin ,(req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;
	}

	Customer.findByIdAndRemove(id).then((customer) => {
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
app.get('/restaurant/:id', authenticateRestaurant, (req,res) => {
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
            console.log("server", restaurant.menu);
			res.send({currRestaurantMenu : restaurant.menu});
		}
	}).catch((error)=>{
		res.status(500).send()
	})
})

//get all the orders for the restaurant
app.get('/restaurant/:id/order', authenticateRestaurant, (req,res) => {
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
app.get('/restaurant' ,(req,res) => {
    Restaurant.find().then((restaurants) => {
        res.send({restaurantList : restaurants});
    },(error) => {
        res.status(500).send()
    })
})


//get the specific order
app.get('/restaurant/:id/order/:order_id',(req,res) => {
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
app.patch('/restaurant/:id',authenticateAdmin, (req, res) => {
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
            restaurant.name = name;
            restaurant.address = address;
            restaurant.deliveryArea = deliveryArea;
            restaurant.category = category;
            restaurant.username = username;
            restaurant.password = password;
            restaurant.save().then((result) => {
                res.send(result);
            }, (error) => {
                res.status(400).send(error);
            });
        }
    })
})

//add category
app.patch('/restaurant/:id/add-category', authenticateRestaurant, (req, res) => {
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

app.delete('/restaurant/:id/:cate_id', (req, res) => {
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
    console.log("From del cate", cateId)

    Restaurant.findById(id).then((restaurant) => {
        if (!restaurant) {
            res.status(404).send();
        } else {
            const category = restaurant.menu.id(cateId);
            if (category) {
                restaurant.menu.id(cateId).remove()
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
//add item
app.patch('/restaurant/:id/:cate_id/add-item', authenticateRestaurant,(req, res) => {
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

    console.log("from server", req.body);
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


app.delete('/restaurant/:id/:cate_id/:item_id', (req, res) => {
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
		res.status(404).send("category id not valid")  
		return;  
    }

    Restaurant.findById(id).then((restaurant) => {
        if (!restaurant) {
            res.status(404).send();
        } else {
            const category = restaurant.menu.id(cateId);
            if (category) {
                const item = category.items.id(itemId);

                if (item) {
                    category.items.id(itemId).remove()
                    restaurant.save().then((result) => {
                        res.send(result);
                    }, (error) => {
                        res.status(400).send(error);
                    });
                }
            } else {
                res.status(404).send()
            }
        }
    })
})

//edit category name
app.patch('/restaurant/:id/:cate_id', authenticateRestaurant,(req, res) => {

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
app.patch('/restaurant/:id/:cate_id/:item_id', authenticateRestaurant,(req, res) => {

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

app.delete('/restaurant/:id',authenticateAdmin, (req, res) => {
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

app.delete('/restaurant/:id/order/:order_id', authenticateRestaurant,(req,res) => {
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

app.get('/api/products', (req, res) => {
    return res.json(data.products);
  });
  
  app.post('/api/products', (req, res) => {
    let products = [], id = null;
    let cart = JSON.parse(req.body.cart);
    if (!cart) return res.json(products)
    for (var i = 0; i < data.products.length; i++) {
      id = data.products[i].id.toString();
      if (cart.hasOwnProperty(id)) {
        data.products[i].qty = cart[id]
        products.push(data.products[i]);
      }
    }
    return res.json(products);
  });
  


/*********************************************************/

/*** Image API Routes below ************************************/

// a POST route to *create* an image
app.post("/images", multipartMiddleware, (req, res) => {

    // Use uploader.upload API to upload image to cloudinary server.
    cloudinary.uploader.upload(
        req.files.image.path, // req.files contains uploaded files
        function (result) {

            // Create a new image using the Image mongoose model
            var img = new Image({
                image_id: result.public_id, // image id on cloudinary server
                image_url: result.url, // image url on cloudinary server
                created_at: new Date(),
            });

            // Save image to the database
            img.save().then(
                saveRes => {
                    res.send(saveRes);
                },
                error => {
                    res.status(400).send(error); // 400 for bad request
                }
            );
        });
});

// a GET route to get all images
app.get("/images", (req, res) => {
    Image.find().then(
        images => {
            res.send({ images }); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

/// a DELETE route to remove an image by its id.
app.delete("/images/:imageId", (req, res) => {
    const imageId = req.params.imageId;

    // Delete an image by its id (NOT the database ID, but its id on the cloudinary server)
    // on the cloudinary server
    cloudinary.uploader.destroy(imageId, function (result) {

        // Delete the image from the database
        Image.findOneAndRemove({ image_id: imageId })
            .then(img => {
                if (!img) {
                    res.status(404).send();
                } else {
                    res.send(img);
                }
            })
            .catch(error => {
                res.status(500).send(); // server error, could not delete.
            });
    });
});



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


