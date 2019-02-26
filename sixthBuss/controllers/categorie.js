'use strict'

var Categorie = require('../models/categorie');

function saveCategorie(req, res){
    var categorie = new Categorie();
    var params = req.body;

    if(req.des.role == 'ROLE_ADMIN'){
      if(params.name){
        categorie.name = params.name;

        Categorie.save((err, categorie) =>{
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

function dropAdmin(req, res){
    var categorieId = req.params.id;  

    if(req.des.role == 'ROLE_ADMIN'){
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
            res.status(200).send({
              message: 'Record successfully deleted', categorie: category
            });
          }
        }
      });
    }else{
      res.status(500).send({message: 'Only administrator have permission to do this'});
    }
  }

  function updateAdmin(req, res){
    var adminId = req.params.id;
    var update = req.body;

    if(req.des.role == 'ROLE_ADMIN'){
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
    if(req.see.role == 'ROLE_ADMIN'){
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


module.exports = {
    listCategory,
    saveCategorie,
    updateAdmin,
    dropAdmin
}