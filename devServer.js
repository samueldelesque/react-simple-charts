var path = require('path'),
    express = require('express'),
    webpack = require('webpack'),
    config = require('./webpack.config.demo')


var app = express()

app.get('/demo.js', function(req, res) {
  res.sendFile(path.join(__dirname, '/demo/demo.js'))
})

app.get('/style.css', function(req, res) {
  res.sendFile(path.join(__dirname, '/demo/style.css'))
})

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/demo/index.html'))
})

app.listen(5019, 'localhost', function(err) {
  if (err) {
    console.log(err)
    return
  }

  console.log('Listening at http://localhost:5019')
})
