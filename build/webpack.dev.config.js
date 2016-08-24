var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var config = require('../config');

var entry = {};

function walk(dir) {
  dir = dir || '.'
  var directory = path.join(__dirname, '../src', dir);
  fs.readdirSync(directory)
    .forEach(function(file) {
      var fullpath = path.join(directory, file);
      var stat = fs.statSync(fullpath);
      var extname = path.extname(fullpath);
      if (stat.isFile() && extname === '.we') {
        var name = path.join('src', 'build', dir, path.basename(file, extname));
        entry[name] = fullpath + '?entry=true';
      } else if (stat.isDirectory() && file !== 'build' && file !== 'include') {
        var subdir = path.join(dir, file);
        walk(subdir);
      }
    });
}

walk();

var webpackConfig = {
  entry: entry,
  output: {
    path: path.join(__dirname, '..'),
    publicPath: config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.we'],
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.we(\?[^?]+)?$/,
        loader: 'weex'
      },
      {
        test: /\.js(\?[^?]+)?$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-2']
        }
      }
    ]
  }
  // plugins: [
  //   // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
  //   new webpack.optimize.OccurenceOrderPlugin(),
  //   new webpack.HotModuleReplacementPlugin(),
  //   new webpack.NoErrorsPlugin()
  // ]
}

// add hot-reload related code to entry chunks
// Object.keys(webpackConfig.entry).forEach(function (name) {
//   webpackConfig.entry[name] = ['./build/dev-client'].concat(webpackConfig.entry[name])
// })

module.exports = webpackConfig;
