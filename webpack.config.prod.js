var path = require('path');
var webpack = require('webpack');
var BomPlugin = require('webpack-utf8-bom');//中文乱码

var phaserModule = path.join(__dirname, '/node_modules/phaser');

var phaser = path.join(phaserModule, 'build/custom/phaser-split.js'),
    pixi = path.join(phaserModule, 'build/custom/pixi.js'),
    p2 = path.join(phaserModule, 'build/custom/p2.js');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src'); //__dirname 中的src目录，以此类推
var APP_FILE = path.resolve(APP_PATH, 'app'); //根目录文件app.jsx地址
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist'); //发布文件所存放的目录/dist/前面加/报错？

module.exports = {
    entry: [
        APP_FILE,
    ],
    output: {
        path: BUILD_PATH + '/src/',
        filename: 'bundle.js',
        chunkFilename: "[name].[chunkhash:5].min.js",
        publicPath: '',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /^node_modules$/,
            loader: 'babel'
        }, {
            test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
            exclude: /^node_modules$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
        }, {
            test: /\.(png|jpg|gif)$/,
            exclude: /^node_modules$/,
            loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
            //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图
        }],
        noParse: [
            p2
        ]
    },
    resolve: {
        extensions: ['', '.js', '.png', '.jpg'],
        alias: {
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2,
        }
    },
    devtool: "source-map",
    plugins: [
        new BomPlugin(true, /\.(js|jsx|cshtml)$/),//解决中文乱码的问题
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production') //定义生产环境
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false, // remove all comments
            },
            compress: {
                warnings: false
            }
        }),

    ],
};
