'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = Schema({
    name: String,
    stock: Number,
    price: Number,
    cont: Number,
    category: {type: Schema.ObjectId, ref: 'Category'},
});

module.exports = mongoose.model('Product', ProductSchema);