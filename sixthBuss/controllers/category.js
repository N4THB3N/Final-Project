'use strict'

var Categorie = require('../models/category');
var Product = require('../models/product');  

function saveCategorie(req, res){
    var categorie = new Categorie();
    var params = req.body;

    if(req.des.role == 'ADMIN_ROLE'){
      if(params.name){
        categorie.name = params.name;
        categorie.save((err, categorie) =>{
            if(err){
                res.status(500).send({message: 'Unable to add a record on this collection'});
            }else{
                if(!categorie){
                    res.status(500).send({message: 'Unfortunate and sudden error just happened'});
                }else{
                    res.status(500).send({categorie: categorie});
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

function dropCategory(req, res){
    var categorieId = req.params.id;  
    var ver;

    if(req.des.role == 'ADMIN_ROLE'){
      Categorie.findOneAndDelete({ _id:categorieId }, (err, category) => {
        if(err){
          res.status(500).send({
            message: 'There was an error, no way to drop the record'
          })
        }else{
          if(!category){
            res.status(404).send({
              message: 'Unable to delete the record'
            });
          }else{
            Product.findOne({category:categorieId}, (err, buscar) => {
              var usable = buscar._id; 
              if(buscar == null){
                  res.status(200).send({
                    message: 'Record successfully deleted', categorie: category
                  });
              }else{
                Categorie.findOne({name:'Storaged stuff'}, (err, encontrarBabo) => {
                  if(encontrarBabo == null){
                    var category = new Categorie();
                    category.name = 'Storaged stuff';
              
                    category.save({}, (err, guardar) => {
                        var defecto = guardar._id;  
                        Product.findOne({category:categorieId}, (err, buscar) => {
                          var bruto = buscar._id;
                          Product.findByIdAndUpdate(bruto, defecto, {new:true}, (err, cosa) =>{
                              res.status(200).send({cosa});
                          })
                        })        
                        
                  });
                }else{
                  res.status(500).send({message: 'We have done this before'});
                }
                });
              }
          });
            // res.status(200).send({
            //   message: 'Record successfully deleted', categorie: category
            // });
          }
        }
      });
    }else{
       
      //  res.status(500).send({message: 'Only administrator have permission to do this'});
    }
  }

  function updateCategory(req, res){
    var adminId = req.params.id;
    var update = req.body;

    if(req.des.role == 'ADMIN_ROLE'){
      Categorie.findByIdAndUpdate(adminId, update, {new: true}, (err, admin) => {
        if(err){
          res.status(500).send({
            message: 'There was an error while updating the teacher'
          });
        }else{
          if(!admin){
            res.status(404).send({
              message: 'Unable to update the record from admin collection'
            });
          }else{
            res.status(200).send({
              categorie: admin
            });
          }
        }
      });
    }else{
      res.status(500).send({message: 'Just administrator is able to do this'});
    }
  }

  function listCategory(req, res){
    if(req.des.role == 'ADMIN_ROLE'){
      Categorie.find({}, (err, categorieList) => {
        if(err){
            console.log(err);
            res.status(500).send({message: 'No way to make a list'});
        }else{
            res.status(500).send({
                message:'Welcome administrator check out the list of students carefully', categorie: categorieList
            });
        }
    });
    }else{
      res.status(500).send({message: 'Just administrator'});
    }
  }

  function neee(req, res){
    Categorie.findOne({name: 'Perros y gatos'}, (err, be) =>{
      if(be == null){
        res.status(500).send({message: 'Voila'});
      }
    })
  }

module.exports = {
    listCategory,
    saveCategorie,
    updateCategory,
    dropCategory,
    neee
}