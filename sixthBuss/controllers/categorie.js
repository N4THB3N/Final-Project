'use strict'

var Categorie = require('../models/categorie');

function saveThe(req, res){
  var categorie = new Categorie();
  var params = req.body;

  if(params.name){
      categorie.name = params.name;

      categorie.save((err, categorieSave) =>{
          if(err){
              res.status(500).send({message: 'Unable to make a record of the data'});
          }else{
              if(!categorieSave){
                  res.status(500).send({message: 'An error occurred, while saving the categorie'});
              }else{
                  res.status(200).send({categorie: categorieSave});
              }
          }
      });    

  }else{
      res.status(404).send({message: 'Write all the fields required'});
  }
}

function updateCategorie(req, res){
    var categorieId = req.params.id;
    var update = req.body;

    Categorie.findByIdAndUpdate(categorieId, update, {new: true}, (err, categorieUpdate) =>{
        if(err){
            res.status(500).send({message: 'There was an error while updating the teacher'})
        }else{
            if(!categorieUpdate){
                res.status(404).send({message: 'Unable to update the categorie record'});
            }else{
                res.status(200).send({categorie: categorieUpdate});
            }
        }
    });
}

module.exports = {
    saveThe,
    updateCategorie
}