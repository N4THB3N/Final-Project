'use strict'

var express = require('express');
var CategorieController = require('../controllers/categorie');
var md_auth = require('../middlewares/authenticated');
var api = express.Router();

api.post('/saveCategorie', md_auth.ensureAut, CategorieController.saveThe);
api.put('/updateCategorie/:id', md_auth.ensureAut, CategorieController.updateCategorie);
api.put('/dropCategory', md_auth.ensureAut, CategorieController.dropAdmin);
api.get('/listCategory', md_auth.ensureAut, CategorieController.listCategory);

module.exports = api;