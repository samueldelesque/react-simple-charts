var path = require('path'),
    webpack = require('webpack'),
    _ = require('lodash'),
    directories = [path.resolve('./'), path.resolve('./js'), path.resolve('./components')],
    entrypoints = require('./entrypoints.js')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: _.zipObject(Object.keys(entrypoints), _.map(entrypoints, function(entrypoint){
    return [
      'eventsource-polyfill', // necessary for hot reloading with IE
      'webpack-hot-middleware/client',
      entrypoint
    ]
  })),
  resolve: {
    root: directories,
    extensions: ['', '.js', '.es6 ', '.jsx'],
  },
  output: {
    path: '/',
    filename: '[name].bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
        {
          test: /\.jsx?|\.es6/,
          loaders: ['babel?presets[]=stage-0'],
          include: directories,
          exclude: [path.resolve('./node_modules')]
        },
        {
            test: /\.scss|\.css$/,
            loader: "style!css!sass"
        }
    ]
  }
};
