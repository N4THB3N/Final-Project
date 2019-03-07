'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();

api.post('/saveUser', UserController.SaveUser);
api.get('/listUser', UserController.userList);
api.put('/updateUser/:id', md_auth.ensureAut, UserController.updateUser);
api.put('/dropUser/:id', md_auth.ensureAut, UserController.dropClient);
api.put('/newCart/:id', UserController.addCart);

module.exports = api;