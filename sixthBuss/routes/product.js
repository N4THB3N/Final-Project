'use strict'

var express = require('express');
var ProductController = require('../controllers/product');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();

api.post('/saveProduct', ProductController.saveProduct);

module.exports = api;