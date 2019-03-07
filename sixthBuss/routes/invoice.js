'use strict'

var express = require('express');
var InvoiceController = require('../controllers/invoice');
var md_auth = require('../middlewares/authenticated');
var api = express.Router();

api.post('/saveInvoice/:id', md_auth.ensureAut, InvoiceController.saveInvoice);
api.put('/updateInvoice/:id', md_auth.ensureAut, InvoiceController.updateInvoice);
api.put('/dropInvoice', md_auth.ensureAut, InvoiceController.dropInvoice);
api.get('/listInvoice', md_auth.ensureAut, InvoiceController.listInvoice);
api.get('/listById', md_auth.ensureAut, InvoiceController.listByUser);
api.get('/soldMost', md_auth.ensureAut, InvoiceController.soldMost);

module.exports = api;