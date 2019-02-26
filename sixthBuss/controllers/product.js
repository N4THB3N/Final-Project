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

function updateProduct(req, res){
    var update = req.body;
    var updateId = req.params.id;

    if(req.des.role == 'ADMIN_ROLE'){
        Product.findByIdAndUpdate({_id: updateId}, (err, product) => {
            if(err){
                res.send(500).send({message: 'There was an unexpected error'});
            }else{
                if(!product){
                    res.status(404).send({message: 'Unable to update the record'});
                }else{
                    res.status(200).send({product: product});
                }
            }   
        });
    }else{

    }
}

module.exports = {
    saveProduct,
    updateProduct
}