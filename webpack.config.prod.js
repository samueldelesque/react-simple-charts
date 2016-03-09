var path = require('path'),
    webpack = require('webpack'),
    directories = [path.resolve('./'), path.resolve('./js'), path.resolve('./components')],
    entrypoints = require('./entrypoints.js')

module.exports = {
  devtool: 'source-map',
  entry: entrypoints,
  resolve: {
    root: directories,
    extensions: ['', '.js', '.es6 ', '.jsx'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]/[name].js',
    publicPath: '/dist/',
    library: true,
    libraryTarget: 'commonjs2'
  },
  externals: {
    'react': 'commonjs react',
    'react-dom': 'commonjs react-dom',
    'moment': 'commonjs moment',
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
