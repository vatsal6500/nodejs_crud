const router = require('express').Router();
const Customer = require('../models/Customer');
const multer = require('multer');
const dcrypt = require('dcryptjs');

const { body, check, validationResult} = require('express-validator');
//Difine storage for images
const storage = multer.diskStorage({
    //destination for file
    destination:(req,file,cb) => {     //request,file,callback
        cb(null, './public/profile');
    },
    //add back the extension
    filename:(req,file,cb) => {
        cb(null,Date.now() + file.originalname);
    },
});

//upload parameter for multer
const uploadSingle = multer({
    storage:storage
}).single('image');

const uploadMultiple = multer({    
    storage:storage
}).array('image',3);


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

router.post(
    '/add',
    [
        body('name')
            .exists().withMessage("name required")
            .isLength({min:3}).withMessage("min 3"),
        body('email')
            .exists().withMessage("Email Required")
            .isEmail().normalizeEmail().withMessage("Invalid email"),
        body('password')
            .exists().withMessage("password required")
            .isLength({min:5}).withMessage("min 5"),
        body('phonenumber')
            .exists().withMessage("phone no required")
            .isLength({min:10,max:10}).withMessage("must be 10")
            
    ],
    uploadSingle,
    (req,res) => {

        let error = validationResult(req);
        console.log(error);
        if(!error.isEmpty()){
            return res.status(400).jsonp({errors: error.array()});
        }

        let cust = new Customer({
            name : req.body.name,
            photo : req.file.filename,  //body not required
            email : req.body.email,
            password : dcrypt.hash(req.body.password,10), //10 means number of times dcript
            phonenumber : req.body.phonenumber
        });

        return res.json(cust);

        // cust.save((err,data) => {
        //     if(err) return res.status(500).send("there was a problem saving." + err);
        //     res.redirect('/customers');
        // });
    }
);

router.post('/edit', (req,res) => {
    Customer.findById(
        {"_id":req.body.id},
        (err,data) => {
            if(err) return res.status(500).send("There was a problem finding.");
            if(data < 2) return res.status(404).send("Data not Found");
            res.status(200).render('CustomerEdit',{List:data});
        });
});

router.post('/edits', uploadSingle, (req,res) => {
    if(req.file){
        let dataBody = {
            name : req.body.name,
            photo : req.file.filename,  //body not required
            email : req.body.email,
            password : req.body.password,
            phonenumber : req.body.phonenumber
        }
        Customer.findByIdAndUpdate(
            {'_id':req.body.id},
            dataBody,
            {new:true},
            (err, data) => {
                if(err) return res.status(500).send("There was a problem finding.");
                res.redirect('/customers');
            }
        );
    }else {
        let dataBody = {
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            phonenumber : req.body.phonenumber
        }
        Customer.findByIdAndUpdate(
            {'_id':req.body.id},
            dataBody,
            {new:true},
            (err, data) => {
                if(err) return res.status(500).send("There was a problem finding.");
                res.redirect('/customers');
            }
        );
    }
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