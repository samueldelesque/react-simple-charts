var path = require('path'),
    express = require('express'),
    webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    config = require('./webpack.config.dev')


var app = express(),
    compiler = webpack(config)


app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {colors: true}
}))

app.use(webpackHotMiddleware(compiler, {
  log: console.log
}))

app.get('/dist/:file', function(req, res) {
  console.log('Requesting build file', req.params.file)
  res.sendFile(path.join(__dirname, 'dist', req.params.file))
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
