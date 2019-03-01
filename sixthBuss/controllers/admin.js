'use strict'

var Admin = require('../models/admin');
var User = require('../models/user');
var jwt = require('../services/jwt');
var bcrypt = require('bcrypt-nodejs');

function SaveAdmin(req, res){
    var admin = new Admin();
    var params = req.body;

    if(params.name && params.surname && params.email && params.password){
        admin.name = params.name;
        admin.surname = params.surname;
        admin.email = params.email;
        admin.role = 'ADMIN_ROLE';

        Admin.findOne({email: admin.email.toLowerCase()}, (err, issetAdmin) => {
            if(err){
                res.status(500).send({message: 'There was an error'});
            }else{
                if(!issetAdmin){
                    bcrypt.hash(params.password, null, null, function(err,hash){
                        admin.password = hash;

                        admin.save((err, adminStored) =>{
                            if(err){
                                res.status(500).send({message: 'We are anuble to save this record'});
                            }else{
                                if(!adminStored){
                                    res.status(404).send({message: 'No way to save this record'});
                                }else{
                                    res.status(200).send({admin: adminStored});
                                }
                               
                            }
                        });
                    });
                }else{
                    res.status(200).send({message: 'You are asking for something that we cannot afford'});
                }
            }
        });
    }else{
        res.status(200).send({message: 'Check out all the fields, some of these are required'});
    }
}

function login(req, res){
    var params = req.body;
    var email = params.email;
    var password = params.password;

    Admin.findOne({email: email}, (err, admin) => {
      if(err){
        res.status(500).send({
          message: 'An error occurred while loggin in the application'
        });
      }else{
        if(admin){
          bcrypt.compare(password, admin.password, (err, check) => {
            if(check){
              if(params.gettoken){
                res.status(200).send({
                  token: jwt.createToken(admin), message: 'Welcome dear Administrator!'
                });
              }
            }else{
              res.status(404).send({
                message: 'The user is unable to log-in correctly'
              });
            }
          });
        }else{
          User.findOne({email:email}, (err, user) =>{
            if(err){
              res.status(500).send({message: 'There was an error in the login'});
            }else{
              if(user){
                bcrypt.compare(password, user.password, (err, check) =>{
                  if(check){
                    if(params.gettoken){
                      res.status(200).send({token: jwt.tokenCreated(user), message: 'Welcome dear client!'});
                    }else{
                      res.status(404).send({message: 'There cannot log-in this application'});
                    }
                  }
                })
              }else{
                res.status(404).send({message: 'No user found'});
              }
            }
          });
        }
      }
    });
  }

  function dropAdmin(req, res){
    var adminId = req.params.id;  

    if(req.des.role == 'ADMIN_ROLE'){
      Admin.findOneAndDelete({ _id:adminId }, (err, adminDelete) => {
        if(err){
          res.status(500).send({
            message: 'There was an error, no way to drop the record'
          })
        }else{
          if(!adminDelete){
            res.status(404).send({
              message: 'Unable to delete the record'
            });
          }else{
                  res.status(200).send({
                      message: 'Record successfully deleted', admin: adminDelete
                    });
          }
        }
      });
    }else{
      res.status(500).send({message: 'No permission to do this'});
    }
  }

  function updateAdmin(req, res){
    var adminId = req.params.id;
    var update = req.body;

    if(req.des.role == 'ADMIN_ROLE'){
      Admin.findByIdAndUpdate(adminId, update, {new:true}, (err, updateAdmin) =>{
      if(err){
          res.status(500).send({message: 'Theres no way to update the record'});
      }else{
          if(!updateAdmin){
              res.status(404).send({message: 'No records to update down here'});
          }else{
                res.status(200).send({admin: updateAdmin});                
          }
        }
      });
    }else{
      res.status(500).send({message: 'Nobody else than the user can change this record, are you a client?'})
    }
}

function adminList(req, res){
  Admin.find({}, (err, admin) =>{
    if(err){
      console.log(err);
      res.status(500).send({
        message: 'We couldnt realise this pettition'
      });
    }else{
      res.status(200).send({admin});
    }
  });
}

module.exports = {
    SaveAdmin,
    login,
    dropAdmin,
    updateAdmin,
    adminList
}   