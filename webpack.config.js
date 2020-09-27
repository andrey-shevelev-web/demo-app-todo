const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let conf = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'index.js',
    publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              "@babel/plugin-transform-react-jsx", 
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }
      }
    ]
  },
  plugins: [
   new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html'
    })
  ]
};

module.exports = conf;
