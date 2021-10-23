const router = require('express').Router();
//const schema = require('../schema/validate-schema');
//const registerMiddleware = require('../schema/validator_middleware');
const { body, validationResult } = require('express-validator');
const Customer = require('../models/Customer');

router.get('/', (req,res) => {
    Customer.find((err,data) => {
        if(err) return res.status(500).send("There was a problem finding.");
        if(data < 2) return res.status(404).send("Data Not Found");
        res.status(200).render('CustomerList',{customerList:data});
    });
});

router.get('/addnew', (req,res) => {
    res.status(200).render('CustomerAdd');
});

router.post('/add',(req,res) => {
    let cust = new Customer({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        phonenumber : req.body.phonenumber
    });
    cust.save((err,data) => {
        if(err) return res.status(500).send("there was a problem saving.");
        res.redirect('/customers');
    });
});

router.post('/edit', (req,res) => {
    Customer.findById(
        {"_id":req.body.id},
        (err,data) => {
            if(err) return res.status(500).send("There was a problem finding.");
            if(data < 2) return res.status(404).send("Data not Found");
            res.status(200).render('CustomerEdit',{List:data});
        });
});

router.post('/edits', (req,res) => {
    Customer.findByIdAndUpdate(
        {'_id':req.body.id},
        req.body,
        {new:true},
        (err, data) => {
            if(err) return res.status(500).send("There was a problem finding.");
            res.redirect('/customers');
        }
    );
});

router.post('/delete', (req,res) => {
    Customer.findByIdAndDelete(
        { "_id":req.body.id },
        (err,data) => {
            if(err) return res.status(500).send("There was a problem finding.");
            res.redirect('/customers');
        }
    );
});

module.exports = router;