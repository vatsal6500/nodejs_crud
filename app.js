//includes
const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
// const cookieParser = require('cookie-parser');
const bookRouter = require('./routes/BookRouter');
const custRouter = require('./routes/CustRouter');
const homeRouter = require('./routes/HomeRouter');


//app setting
app.set("view engine", "pug");
app.set("views","./views");


//middlewares
app.use(express.urlencoded({extended:true})); // used insted of body parser
app.use(express.json()); // for testing in postman(ANY) must required
app.use(morgan("combined")); // think morgan as a helper that generates request logs.
//app.use(helmet());
app.use(express.static('public'))

//console.log(path.join(__dirname, 'views/script.js'));

//routes
app.use('/books',bookRouter);
app.use('/customers',custRouter);
app.use('/home',homeRouter);


//server
app.listen(6969, (req,res) => {
    console.log('server is listening at port 6969');
});



// {
//     "name" : "vatsal tailor",
//     "email" : "vatsaltailor6500@gmail.com",
//     "password" : "64f466e6",
//     "phonenumber" : 8141939329
// }

// {
//     "bname" : "Harry Potter Part 1",
//     "price" : 1500,
//     "aname" : "JK Rollings",
//     "qty" : 3
// }