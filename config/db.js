//include
const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/test",{useNewUrlParser:true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, "Connection Error"));
db.on('open', () => { console.log("Connected") });
//export
module.exports = mongoose;