'use strict'

var Product = require('../models/product');
var Category = require('../models/category');
//////Last update of the controller

function saveProduct(req, res){
    var product = new Product();
    var params = req.body;

    if(req.des.role == 'ADMIN_ROLE'){
      if(params.name && params.stock && params.price){
        product.name = params.name;
        product.stock = params.stock;
        product.price = params.price;
        product.category = req.params.id;

        product.save({}, (err, Product) => {
            if(err){
                res.status(404).send({message: 'There was an error, Were sorry'});
            }else{
                    res.status(500).send({Product: product});
            }
        });
    }
    }else{
      res.status(500).send({
        message: 'It seems like you dont have an administrator account, do you?'
      })
    }
}

function updateProduct(req, res){
  var productId = req.params.id;
  var update = req.body;

  if(req.des.role == 'ADMIN_ROLE'){
    Product.findByIdAndUpdate(productId, update, {new: true}, (err, invoice) => {
      if(err){
        res.status(500).send({
          message: 'There was an error while updating the teacher'
        });
      }else{
        if(!invoice){
          res.status(404).send({
            message: 'Unable to update the record from admin collection'
          });
        }else{
          res.status(200).send({
            product: invoice
          });
        }
      }
    });
  }else{
    res.status(500).send({message: 'Just administrator is able to do this'});
  }
}

function dropProduct(req, res){
    var productId = req.params.id;  

    if(req.des.role == 'ADMIN_ROLE'){
      Product.findOneAndDelete({ _id:productId }, (err, productDelete) => {
        if(err){
          res.status(500).send({
            message: 'There was an error, no way to drop the record'
          })
        }else{
          if(!productDelete){
            res.status(404).send({
              message: 'Unable to delete the record'
            });
          }else{
                  res.status(200).send({
                      message: 'Record successfully deleted', product: productDelete
                    });
          }
        }
      });
    }else{
      res.status(500).send({message: 'No permission to do this'});
    }
  }


function ProductList(req, res){
  Product.find({}, (err, product) =>{
    if(err){
      console.log(err);
      res.status(500).send({
        message: 'We couldnt realise this pettition'
      });
    }else{
      res.status(200).send({product});
    }
  });
}

function seekByName(req, res){
  var params = req.body;
  var name = params.name;

  Product.find({name:name}, (err, findProduct) => {
    if(err){
      res.status(500).send({message: 'Just error'});
    }else{
      if(!findProduct){
        res.status(404).send({
          message: 'Theres no record found'
        });
      }else{
        res.status(200).send({
          findProduct
        });
      }
    }
  });
}

function seekByCategory(req, res){
  var params = req.body;
  var category = params.category;

  Category.find({name: category}, (err, issetCategory) => {
    var id = issetCategory._id;

    Product.find({_id:id}, (err, issetProduct) => {
        if(err){
          res.status(500).send({
            message: 'There is an error'
          });
        }else{
          if(!issetProduct){
            res.status(404).send({message: 'No record inside the collection'});
          }else{
            res.status(200).send({
              issetProduct
            });
          }
        }
    });
  });
}

module.exports = {
    saveProduct,
    updateProduct,
    ProductList,
    dropProduct,
    seekByName,
    seekByCategory
}