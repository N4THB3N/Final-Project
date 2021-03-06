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

function dropWell(req, res){
  var categorieId = req.params.id;         
  var categorie = new Categorie();
  var nombre = 'Storaged stuff';
  categorie.name = nombre;

    if(req.des.role == 'ADMIN_ROLE'){
      Product.find({category:categorieId}, (err, findProduct) =>{
        if(err){
          res.status(500).send({message: 'Theres an error'});
        }else{
          if(findProduct){
            Categorie.findOne({name: 'Default'}, (err, categorieSi) => {
                var storageId = categorieSi._id;
  
                Product.updateMany({category: categorieId}, { category: storageId }, (err, updateds)=>{
                  if(err){
                    res.status(500).send({message: 'There was an error'});
                  }else{
                    Categorie.findOneAndDelete({_id:categorieId}, (err, dropThis) =>{
                      res.status(200).send({message: 'Successfully deleted', dropThis});
                    });
                  }
                });
            });
          
          }else{
            Categorie.findOneAndDelete({_id:categorieId}, (err, eliminar) =>{
              res.status(200).send({message: 'Okay, we dropped the category!', eliminar});
          });
          }
        }  
      });
    }else{
      res.status(404).send({message: 'Incorrect user!'})
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

  function listCategory(req,res){
    Categorie.find({}, (err, categories) => {
      if(err){
        console.log(err);
        res.status(500).send({message: 'Esta cosa no se pudo'})
      }else{
        res.status(200).send({categories});
      }
    })

  }

  function listByCategory(req,res){
    var params = req.body;
    var ple = params.name;

    Categorie.findOne({name: ple}, (err, listCategory) => {
      if(err){
        res.status(500).send({message: 'There an error doing while doing this'})
      }else{
        if(!listCategory){
          res.status(500).send({message: 'No category found'});
        }else{
          res.status(200).send({listCategory});
        }
      }
    });
  }

module.exports = {
    listCategory,
    saveCategorie,
    updateCategory,
    dropWell,
    listByCategory
}