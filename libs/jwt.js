const jwt = require('jsonwebtoken');
const key = "kjabsdkfjb273ry8273yit2jn38t7y12093ut92n3kfjho283yglk2n3pg87hwerjsb";
const expireSec = 3000;

const sign = (req,res) => {
    const token = jwt.sign({email:"user1"},key,{algorithm:"HS256",expiresIn:expireSec})
    console.log(token);
    res.cookie("token",token,{maxAge:expireSec*1000});
    //res.send(token);
    res.redirect('/home');
};

const verify = (req,res,next) =>  {

        let token;
        if(req.cookies.token)
        {
            token=req.cookies.token;
            jwt.verify(token,key);
            //console.log(jwt.verify(token,jwtkey))
            //res.send("key is valid")
            next();
        }
        else
            res.redirect('/home');
            //res.send("provide token")
}

module.exports = {
    sign,
    verify
}