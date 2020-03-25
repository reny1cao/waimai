const log = console.log;

// Express
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());

// Mongo and Mongoose
const { ObjectID } = require('mongodb')
const { mongoose } = require('./db/mongoose');



app.get('/', (req, res) => {
    res.send("Api is working");
})


















const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
});


