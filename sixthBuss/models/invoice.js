'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InvoiceSchema = Schema({
    stock: Number,
    price: Number,
    product: {type: Schema.ObjectId, ref: 'Product'},
    user: {type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Invoice', InvoiceSchema);