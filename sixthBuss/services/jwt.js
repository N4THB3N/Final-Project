'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'secret_key';

exports.createToken = function(admin){
    var payload = {
        sub: admin._id,
        name: admin.name,
        surname: admin.surname,
        email: admin.email,
        password: admin.password,
        role: admin.role,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };
    return jwt.encode(payload, secret);
}

exports.tokenCreated = function(user){
    var matter = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password,
        role: user.role,
        cart: user.cart,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };
    return jwt.encode(matter, secret)
}