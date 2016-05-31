var path = require('path');

module.exports = {
  context: __dirname,
  entry: path.join(__dirname, 'frontend', 'petsy.jsx'),
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query {
          presets: ['react']
        }
      },
      {
        test: /\node$/,
        loader: "node-loader"
      }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ["", ".js", ".jsx"]
  }
};
