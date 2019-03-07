'use strict'

var express = require('express');
var CategorieController = require('../controllers/category');
var md_auth = require('../middlewares/authenticated');
var api = express.Router();

api.post('/saveCategorie', md_auth.ensureAut, CategorieController.saveCategorie);
api.put('/updateCategorie/:id', md_auth.ensureAut, CategorieController.updateCategory);
api.put('/dropCategory/:id', md_auth.ensureAut, CategorieController.dropWell);
api.get('/listCategory', md_auth.ensureAut, CategorieController.listCategory);
api.get('/nameCategory', md_auth.ensureAut, CategorieController.listByCategory);

module.exports = api;