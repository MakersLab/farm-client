const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./app/index.html",
  // filename: "./index.html"
});

module.exports = {
  entry: './app/app.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        // use: ['style-loader', 'css-loader'],
        use: ['style-loader', 'css-loader?modules', 'postcss-loader'],
      },
      // {
      //   test: /\.(html)$/,
      //   use: {
      //     loader: 'html-loader',
      //     options: {
      //       attrs: [':data-src']
      //     }
      //   }
      // }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 8080
  },
  devtool: 'source-map',
  plugins: [
    htmlPlugin
  ]
};
