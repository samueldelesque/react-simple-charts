var path = require('path'),
    webpack = require('webpack'),
    directories = [path.resolve('./'), path.resolve('./js'), path.resolve('./components')]

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: 'components/demo/entrypoint.jsx',
  resolve: {
    root: directories,
    extensions: ['', '.js', '.es6 ', '.jsx'],
  },
  output: {
    path: path.join(__dirname, 'demo'),
    filename: 'demo.js',
    publicPath: '/demo/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
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
