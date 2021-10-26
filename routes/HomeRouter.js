const router = require('express').Router();
const jwt = require('jsonwebtoken');
const key = "kjabsdkfjb273ry8273yit2jn38t7y12093ut92n3kfjho283yglk2n3pg87hwerjsb";
const expireSec = 3000;
const Customer = require('../models/Customer');
const dcrypt = require('dcryptjs');
const { hash } = require('dcryptjs');
const { contentSecurityPolicy } = require('helmet');

router.get('/', (req,res) => {
    res.status(200).render("Home");
});

router.get('/login', (req,res) => {
    res.render('CustLogin',{ title:"Login" });
})

router.post('/login', (req,res) => {
    console.log(req.body);
    const { email, password } = req.body;
    //res.json(`${email} ${password}`);
    Customer.findOne({email: email})
    .then((result) => {
        try{
            const pass = dcrypt.compare(req.body.password,result.password);
            console.log(pass);
            console.log(result.password);
            if(result){
                const token = jwt.sign({email: req.body.email},key,{algorithm:"HS256",expiresIn:expireSec});
                res.cookie("token",token,{maxAge:expireSec*1000});
                res.json(result);
            }
            else{
                res.json({message:"Invalid email/password"});
            }
        }
        catch(error){
            res.send(error.message + "try/catch");
        }
        
    })
    .catch((err) => res.json(err.message + ".catch error"))
});


module.exports = router;