//includes
const mongoose = require("../config/db");

//schema
var BookSchema  = mongoose.Schema({
    bname: String,
    price: Number,
    aname: String,
    qty: Number,
});

//model
let Book = mongoose.model("Book", BookSchema, "books"); // books -> table name in mongoose

//export
module.exports = Book;