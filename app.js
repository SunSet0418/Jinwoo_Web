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

app.use(express.static('public'));

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
  name : {
    type : String
  },
  letter : {
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

app.get('/', function(req, res){
  fs.readFile('index.html', 'utf-8', function(err, data){
    res.send(data)
  })
})

app.get('/letter', function(req, res){
  fs.readFile('letter.html', 'utf-8', function(err, data){
    res.send(data)
  })
})

app.post('/letter', function(req, res){
  var body = req.body;

  var user = new User({
    name : body.name,
    letter : body.letter
  })

  user.save(function(err, result){
    if(err){
      console.log('/letter Error!')
      throw err
    }
    else {
      console.log(body.name + " Letter Save At Database")
      res.redirect('/')
    }
  })
})
