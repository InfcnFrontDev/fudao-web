let webpack = require('webpack');
let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let WebpackCleanupPlugin = require('webpack-cleanup-plugin');
let merge = require('webpack-merge');
let webpackBaseConfig = require('./webpack.base.config');

module.exports = merge(webpackBaseConfig, {
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'public'),
        filename: 'dist/[name]-[hash:10].js'
    },
    module: {
        loaders: [
            // local css modules
            {
                test: /[\/\\]src[\/\\].*\.css/,
                exclude: /(node_modules|bower_components|public\/)/,
                loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
            },
            // local scss modules
            {
                test: /[\/\\]src[\/\\].*\.scss/,
                exclude: /(node_modules|bower_components|public\/)/,
                loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
            },
            // global css files
            {
                test: /[\/\\](node_modules|global)[\/\\].*\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css')
            }
        ]
    },
    plugins: [
        new WebpackCleanupPlugin({
            "exclude": ['css/**/*','images/**/*','vendors/**/*']
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                drop_console: true,
                drop_debugger: true
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('dist/[name]-[hash:10].css', {
            allChunks: true
        }),
        new webpack.optimize.DedupePlugin()
    ]
});
