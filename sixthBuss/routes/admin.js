'use strict'

var express = require('express');
var AdminController = require('../controllers/admin');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();

api.post('/saveAdmin', AdminController.SaveAdmin);
api.post('/login', AdminController.login);
api.put('/dropAdmin/:id', md_auth.ensureAut, AdminController.dropAdmin);
api.put('/updateAdmin/:id', md_auth.ensureAut, AdminController.updateAdmin);
api.get('/listAdmin', AdminController.adminList);

module.exports = api;