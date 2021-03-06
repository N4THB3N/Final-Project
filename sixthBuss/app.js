'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Routes from the controllers
var user_routes = require('./routes/user');
var admin_routes = require('./routes/admin');
var product_routes = require('./routes/product');
var category_routes = require('./routes/category');
var invoice_routes = require('./routes/invoice')

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Use in here the routes from above
app.use('/v1', user_routes);
app.use('/v1', admin_routes);
app.use('/v1', product_routes);
app.use('/v1', category_routes);
app.use('/v1', invoice_routes);

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

module.exports = app;