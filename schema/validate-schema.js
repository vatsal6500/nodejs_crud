const { body } = require('express-validator');
//body
//validationResult

const schema = [
    body('name', "this name must be 2+ char long")
        .isLength({min: 2})
        .exists(),
    body('email', "Invalid Email")
        .isEmail()
        .normalizeEmail()
        .exists(),
    body('password', "Invalid Password")
        .isLength({min: 8})
        .exists(),
    body('phonenumber', "Phone number must be of 10 digits")
        .isLength({min: 10, max: 10})
        .exists(),
];

module.exports = schema;