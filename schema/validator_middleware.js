const { request, response } = require('express');
const { validationResult } = require('express-validator');


const adderrors = validationResult(request);
if(!adderrors.isEmpty()){
    //return response.status(422).jsonp(adderrors.array());
    const alert = adderrors.array();
    response.render('BookAdd', {alert: alert})
}

module.exports = adderrors;