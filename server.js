const log = console.log;

// Express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Mongo and Mongoose
// const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose');
const { Customer } = require('./models/customer');


app.get('/', (req, res) => {
    res.send("Api is working");
})


/* Customer resource routes */
// A POST route to create a cusotmer

app.post('/Customer/SignUp', (req, res) => {
    
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

app.get('/logInPage', (req, res) => {
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


