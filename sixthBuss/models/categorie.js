'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorieSchema = Schema({
    name: String,
});

module.exports = mongoose.model('Categorie', CategorieSchema);