'use strict'

var express = require('express');
var CategorieController = require('../controllers/categorie');

var api = express.Router();

api.post('/saveCategorie', CategorieController.saveThe);
api.put('/updateCategorie/:id', CategorieController.updateCategorie);

module.exports = api;