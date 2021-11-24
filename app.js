//includes
const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const cookieparser = require('cookie-parser');
const bookRouter = require('./routes/BookRouter');
const custRouter = require('./routes/CustRouter');
const homeRouter = require('./routes/HomeRouter');
const { verify } = require('./libs/jwt');

//app setting
app.set("view engine", "pug");
app.set("views","./views");


//middlewares
app.use(express.urlencoded({extended:false})); // used insted of body parser
app.use(express.json()); 
app.use(morgan("combined")); // think morgan as a helper that generates request logs.
app.use(helmet());
app.use(express.static('public'))
app.use(cookieparser());


//routes
app.use('/books', verify, bookRouter);
app.use('/customers', verify, custRouter);
app.use('/home',homeRouter);
app.get('/gettoken');


//server
app.listen(6969, (req,res) => {
    console.log('server is listening at port 6969');
});