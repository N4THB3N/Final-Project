'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = Schema({
    name: String,
    stock: Number,
    price: Number,
    category: String
});

module.exports = mongoose.model('Product', ProductSchema);