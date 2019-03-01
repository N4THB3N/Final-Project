'use strict'

var Invoice = require('../models/invoice');
var Product = require('../models/product');

function saveInvoice(req, res){
    var invoice = new Invoice();
    var params = req.body;

    if(req.des.role == 'CLIENT_ROLE'){
      if(params.stock, params.price){
        invoice.stock = params.stock;
        invoice.price = params.price;
        invoice.product = req.params.id;
        invoice.user = req.des.sub;

        var id = req.params.id;

        Product.findOne({_id:invoice.product}, (err, product) =>{
          if(product.stock >= invoice.stock){

            var stockFinal = product.stock - invoice.stock;
                        
            Product.findByIdAndUpdate(id, {stock:stockFinal}, {new: true}, (err, invoiceSi) => {
              if(err){
                res.status(500).send({
                  message: 'There was an error while updating the teacher'
                });
              }else{
                if(!invoiceSi){
                  res.status(404).send({
                    message: 'Unable to update the record from admin collection'
                  });
                }else{
                  invoice.save((err, invoice) =>{
                    if(err){
                      res.status(500).send({message:'There is an unexpected error'});
                    }else{
                      if(!invoice){
                        res.status(404).send({message:'Error'});
                      }else{
                        res.status(200).send({invoice, invoiceSi});
                      }
                    }
                  });      
                }
              }
            });
          }else if(product.stock < invoice.stock){
              res.status(500).send({message: 'No enough product storaged for you!'})
          }
        });
    }else{
        res.status(404).send({message: 'Some fields are required'});
    }
  }else{
    res.status(500).send({message: 'Only administrator is able to perform this'});
  }
}

function listByUser(req, res){
  Invoice.find({user:req.des.sub}, (err, invoiceUser) => {
    if(err){
      res.status(500).send({message:'Error'});
    }else{
      if(!invoiceUser){
        res.status(404).send({message: 'No way to display a list'})
      }else{
        res.status(200).send({invoiceUser});
      }
    }
  });
}

function dropInvoice(req, res){
    var invoiceId = req.params.id;  

    if(req.des.role == 'ROLE_ADMIN'){
      Invoice.findOneAndDelete({ _id:invoiceId }, (err, invoice) => {
        if(err){
          res.status(500).send({
            message: 'There was an error, no way to drop the record'
          })
        }else{
          if(!invoice){
            res.status(404).send({
              message: 'Unable to delete the record'
            });
          }else{
            res.status(200).send({
              message: 'Record successfully deleted', invoice: invoice
            });
          }
        }
      });
    }else{
      res.status(500).send({message: 'Only administrator have permission to do this'});
    }
  }

  function updateInvoice(req, res){
    var invoiceId = req.params.id;
    var update = req.body;

    if(req.des.role == 'ROLE_ADMIN'){
      Invoice.findByIdAndUpdate(invoiceId, update, {new: true}, (err, invoice) => {
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
              invoice: invoice
            });
          }
        }
      });
    }else{
      res.status(500).send({message: 'Just administrator is able to do this'});
    }
  }

  function listInvoice(req, res){
    if(req.des.role == 'ADMIN_ROLE'){
      Invoice.find({}, (err, invoiceList) => {
        if(err){
            console.log(err);
            res.status(500).send({message: 'No way to make a list'});
        }else{
            res.status(500).send({
                message:'Welcome administrator', invoice:invoiceList
            });
        }
    });
    }else{
      res.status(500).send({message: 'Just administrator'});
    }
  }


module.exports = {
    listInvoice,
    saveInvoice,
    dropInvoice,
    updateInvoice,
    listByUser
}