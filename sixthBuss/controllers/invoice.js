'use strict'

var Invoice = require('../models/invoice');

function saveInvoice(req, res){
    var invoice = new Invoice();
    var params = req.body;

    if(req.des.role == 'ROLE_ADMIN'){
      if(params.stock, params.price){
        invoice.stock = params.stock;
        invoice.price = params.price;
        invoice.product = req.params.id;

        Invoice.save((err, invoice) =>{
            if(err){
                res.status(500).send({message: 'Unable to add a record on this collection'});
            }else{
                if(!invoice){
                    res.status(500).send({message: 'Unfortunate and sudden error just happened'});
                }else{
                    res.status(500).send({invoice: invoice});
                }
            }
        });
    }else{
        res.status(404).send({message: 'Some fields are required'});
    }
  }else{
    res.status(500).send({message: 'Only administrator is able to perform this'});
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
    if(req.see.role == 'ROLE_ADMIN'){
      Invoice.find({}, (err, invoiceList) => {
        if(err){
            console.log(err);
            res.status(500).send({message: 'No way to make a list'});
        }else{
            res.status(500).send({
                message:'Welcome administrator check out the list of students carefully', invoice:invoiceList
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
    updateInvoice
}