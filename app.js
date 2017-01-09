var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var schema = mongoose.Schema;
var ejs = require('ejs')
var fs = require('fs')
var app = express();

app.use(bodyParser.urlencoded({
  extended : true
}))

mongoose.connect("mongodb://localhost/jinwooweb", function(err){
  if(err){
    console.log("DB Error")
    throw err
  }
  else {
    console.log('DB Connect Success')
  }
})

var UserSchema = new schema({
  username : {
    type : String
  },
  password : {
    type : String
  }
})

var User = mongoose.model('user', UserSchema)

app.listen(3000, function(err){
  if(err){
    console.log('Server Error!')
    throw err
  }
  else {
    console.log('Server Running At 80 Port!')
  }
})
