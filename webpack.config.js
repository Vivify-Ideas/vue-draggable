/* global __dirname, require, module*/
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const pkg = require('./package.json');

const config = env => {
  let libraryName = pkg.name;

  let plugins = [], outputFile;

  if (env === 'build') {
    outputFile = libraryName + '.min.js';
  } else if (env === 'server') {
    plugins.push(new HtmlWebpackPlugin({
      template: 'example/index.ejs'
    }));
  } else {
    outputFile = libraryName + '.js';
  }

  return {
    entry: __dirname + (
      env === 'server' ? '/example/index.js' : '/src/index.js'
    ),
    mode: env === 'build' ? 'production' : 'development',
    devtool: 'nosources-source-map',
    output: {
      path: __dirname + '/lib',
      filename: outputFile,
      library: 'VueDraggable',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      globalObject: 'this'
    },
    devServer: {
      contentBase: path.join(__dirname, 'example'),
      compress: true
    },
    module: {
      rules: [
        {
          test: /(\.jsx|\.js)$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /(\.jsx|\.js)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      modules: [path.resolve('./node_modules'), path.resolve('./src')],
      extensions: ['.json', '.js']
    },
    plugins: plugins
  };
};

module.exports = config;
