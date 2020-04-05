
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/WaimaiAPI', 
{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}, () => console.log("connected to DB!"));

module.exports = { mongoose }