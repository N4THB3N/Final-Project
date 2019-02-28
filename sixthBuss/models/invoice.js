'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InvoiceSchema = Schema({
    stock: Number,
    price: Number,
    product: {type: Schema.ObjectId, ref: 'Product'}
});

module.exports = mongoose.model('Invoice', InvoiceSchema);