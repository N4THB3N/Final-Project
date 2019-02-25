'use strict'

var Product = require('../models/product');

function saveProduct(req, res){
    var product = new Product();
    var params = req.body;

    if(params.name && params.stock && params.price){
        product.name = params.name;
        product.stock = params.stock;
        product.price = params.price;
        product.category = params.category;

        product.save({}, (err, Product) => {
            if(err){
                res.status(404).send({message: 'There was an error, Were sorry'});
            }else{
                    res.status(500).send({Product: product});
            }
        });
    }
}

module.exports = {
    saveProduct
}