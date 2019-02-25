'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 4022;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Bussiness', {useNewUrlParser: true})
.then((err,res)=>{
    console.log('Swited to Bussiness DB');
    app.listen(port, () =>{
        console.log('The Node server and Express are running');
    });
})

.catch(err => (console.log(err)));