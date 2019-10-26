const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cheerio = require('cheerio');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const precss = require('precss');

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  // new webpack.NoErrorsPlugin(),
  new HtmlWebpackPlugin({
    path: '',
    inject: true,
    templateContent: template(), //eslint-disable-line no-use-before-define
  }),
  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'vendor',
  //   minChunks(module) {
  //     // this assumes your vendor imports exist in the node_modules directory
  //     return module.context && module.context.indexOf('node_modules') !== -1;
  //   },
  // }),
  // CommonChunksPlugin will now extract all the common modules from vendor and main bundles
  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'manifest', // But since there are no more common modules between them we end up with just the runtime code included in the manifest file
  // }),
  precss,
];

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    path.join(process.cwd(), 'app/app.js'),
  ],
  output: {
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '',
    filename: './[name].js',
    chunkFilename: '[name].chunk.js',
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  plugins,
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 3,
          name: "commons",
          enforce: true
        }
      }
    }
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        // presets: ['babel-preset-react-hmre'].map(require.resolve),
      },
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader?modules', 'postcss-loader'],
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader',
    }, {
      test: /\.(jpg|png|gif)$/,
      // loaders: [
      //   'file-loader',
      //   {
      //     loader: 'image-webpack-loader',
      //     query: {
      //       progressive: true,
      //       optimizationLevel: 7,
      //       interlaced: false,
      //       pngquant: {
      //         quality: '65-90',
      //         speed: 4,
      //       },
      //     },
      //   },
      // ],
    }, {
      test: /\.html$/,
      loader: 'html-loader',
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.(mp4|webm)$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
      },
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file?name=public/fonts/[name].[ext]',
    },
    {
      test: /\.yaml$/,
      include: path.resolve('data'),
      loader: 'yaml',
    },
    ],
  },
  node: {
    net: 'empty',
    fs: 'empty',
    tls: 'empty',
    dns: 'empty',
  },
};

function template() {
  const html = fs.readFileSync(path.resolve(process.cwd(), 'app/index.html')).toString();
  const document = cheerio(html);

  return document.toString();
}
