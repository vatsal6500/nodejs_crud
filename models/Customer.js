//includes
const mongoose = require('../config/db');

//Schema
let CustSchema = mongoose.Schema({
    name: String,
    photo: String,
    email: String,
    password: String,
    phonenumber: Number
});

//Model
let Customer = mongoose.model('Customer', CustSchema, 'custs');

//export
module.exports = Customer;


// name: { type: String, required: true },
    // photo: String,
    // email: { type: String, required: true, unique: true },
    // password: { type: String, required: true },
    // phonenumber: { type: Number, required: true, unique: true },