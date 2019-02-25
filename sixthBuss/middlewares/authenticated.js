'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'secret_key';

exports.ensureAut = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(404).send({message: 'Theres no authentification for the header request'});
    }
    var token = req.headers.authorization.replace(/['"]+/g, '');
    try{
        var payload = jwt.decode(token, secret);
        if(payload.ex <= moment().unix()){
            return res.status(404).send({message: 'Token has expired'});
        }
    }catch(exp){
        return res.status(404).send({message: 'Invalid token'});
    }
    req.des = payload;

    next();
}