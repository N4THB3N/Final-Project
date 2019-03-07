'use strict'

var Invoice = require('../models/invoice');
var Product = require('../models/product');
var User = require('../models/user');
var cont = 0;

function saveInvoice(req, res){
  var esto = 0;
  var idPro; 
  var description;

  req.des.cart.forEach((product) => {    
    esto = esto + parseInt(product.number);
    idPro = product.product;
    description = product.number;
    Product.findByIdAndUpdate(idPro, {$inc:{stock: -description}}, {new:true}, (err, Updating) =>{
      console.log(Updating);
    });
  });

  var invoice = new Invoice();
  invoice.stock = esto;
  invoice.price = req.body.price;
  cont ++;
  invoice.cont = cont;
  invoice.user = req.des.sub;
  invoice.save((err, thisSave) =>{
    if(err){
      res.status(500).send({message: 'Error'})
    }else{
      res.status(200).send({thisSave});
    }
  });

}

function listByUser(req, res){
  if(req.des.role == 'CLIENT_ROLE'){
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
  }else{
    res.status(200).send({message: 'Youve got to be a user, not administrator'})
  }

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

  function soldMost(req, res){
    if(req.des.role == 'CLIENT_ROLE'){
      Invoice.find({cont:{$gte: 7}}, (err, findInvoices) => {
        if(err){
          res.status(500).send({message: 'Unexpected error'});
        }else{
          if(!findInvoices){
            res.status(404).send({message: 'Were sorry, but none of our products have been saled enough!'});
          }else{
            res.status(200).send({findInvoices});
          }
        }
    });
    }else{
      res.status(500).send({
        message: 'This querie has been thought for clients not administrators, so please go back and get a different kind of account'
      })
    }
  }


module.exports = {
    listInvoice,
    saveInvoice,
    dropInvoice,
    updateInvoice,
    listByUser,
    soldMost
}