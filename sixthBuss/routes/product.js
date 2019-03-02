'use strict'

var express = require('express');
var ProductController = require('../controllers/product');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();

api.post('/saveProduct/:id', md_auth.ensureAut, ProductController.saveProduct);
api.put('/updateProduct/:id', md_auth.ensureAut, ProductController.updateProduct);
api.put('/dropProduct/:id', md_auth.ensureAut, ProductController.dropProduct);
api.get('/listProduct', md_auth.ensureAut, ProductController.ProductList);
api.get('/seekByName', md_auth.ensureAut, ProductController.seekByName);
api.get('/listByCategory', md_auth.ensureAut, ProductController.seekByCategory);


module.exports = api;