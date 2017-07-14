var path = require('path');
var webpack = require('webpack');

var phaserModule = path.join(__dirname, '/node_modules/phaser');

var phaser = path.join(phaserModule, 'build/custom/phaser-split.js'),
  pixi = path.join(phaserModule, 'build/custom/pixi.js'),
  p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/app.js',
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    chunkFilename: "[name].js",
    publicPath: '/static/',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /^node_modules$/,
      loader: 'babel'
    },
    {
      test: /\.(png|jpg|jpeg|gif)$/,
      exclude: /node_modules/,
      loader: 'url-loader?limit=10000&name=images/[name].[hash].[ext]'
    }, {
      test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
      exclude: /node_modules/,
      loader: 'url?prefix=font/&limit=10000&name=font/[name].[ext]'
    }],
    noParse: [
      p2
    ]
  },
  resolve: {
    root: [path.resolve('./src'), __dirname, '/usr/local/lib'], //绝对路径
    //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    extensions: ['', '.js', '.json','.png', '.jpg'],
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2,
    }
  },
  devtool: "source-map",
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
};
