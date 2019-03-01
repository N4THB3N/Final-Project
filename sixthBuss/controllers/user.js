'use strict'

var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

function SaveUser(req, res){
    var user = new User();
    var params = req.body;

    if(params.name && params.surname && params.email && params.password){
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        user.role = 'CLIENT_ROLE';

        User.findOne({email: user.email.toLowerCase()}, (err, issetUser) => {
            if(err){
                res.status(500).send({message: 'There was an error'});
            }else{
                if(!issetUser){
                    bcrypt.hash(params.password, null, null, function(err,hash){
                        user.password = hash;

                        user.save((err, userStored) =>{
                            if(err){
                                res.status(500).send({message: 'We are anuble to save this record'});
                            }else{
                                if(!userStored){
                                    res.status(404).send({message: 'No way to save this record'});
                                }else{
                                    res.status(200).send({user: userStored});
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

function updateUser(req, res){
    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId, update, {new:true}, (err, updateUser) =>{
        if(err){
            res.status(500).send({message: 'Theres no way to update the record'});
        }else{
            if(!updateUser){
                res.status(404).send({message: 'No records to update down here'});
            }else{
                if(req.des.role == 'CLIENT_ROLE'){
                    res.status(200).send({user: updateUser});
                }else{
                    res.status(500).send({message: 'Nobody else than the user can change this record, are you a client?'})
                }
            }
        }
    });
}

function userList(req, res){
    User.find({}, (err, user) =>{
      if(err){
        console.log(err);
        res.status(500).send({
          message: 'We couldnt realise this pettition'
        });
      }else{
        res.status(200).send({user});
      }
    });
  }

  function dropClient(req, res){
    var clientId = req.params.id;  
  
    User.findOneAndDelete({ _id:clientId }, (err, pupilDelete) => {
      if(err){
        res.status(500).send({
          message: 'There was an error, no way to drop the record'
        })
      }else{
        if(!pupilDelete){
          res.status(404).send({
            message: 'Unable to delete the record'
          });
        }else{
            if(req.des.role == 'CLIENT_ROLE'){
                res.status(200).send({
                    message: 'Record successfully deleted', pupil: pupilDelete
                  });
            }else{
                res.status(500).send({
                    message: 'You are not the owner of this account, are you?'
                });
            }
        }
      }
    });
  }


module.exports = {
    SaveUser,
    updateUser,
    userList,
    dropClient
}