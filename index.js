
var express = require('express')
      ,https = require('https')
      ,path = require('path')
      ,app = express()
      ,fs = require('fs')
      ,fetch = require('node-fetch')
      ,rp = require('request-promise');


app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



var data = require('./discourse')

app.get('/' , function (req,res){

  res.render('index')

})

app.get('/topics', function (req,res){
	
	data.getTopicDetails(res)

})


app.get('/students/:id', function (req,res){

  
	id = req.params.id
	data.getPostDetails(res,id)
})



app.listen(3000, function (){
  console.log("running on port 3000")
})