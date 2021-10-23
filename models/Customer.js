//includes
const mongoose = require('../config/db');

//Schema
let CustSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phonenumber: Number,
});

//Model
let Customer = mongoose.model('Customer', CustSchema, 'customers');

//export
module.exports = Customer;