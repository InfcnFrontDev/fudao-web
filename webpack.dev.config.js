"use strict";
let webpack = require('webpack');
let path = require('path');
let DashboardPlugin = require('webpack-dashboard/plugin');
let merge = require('webpack-merge');
let webpackBaseConfig = require('./webpack.base.config');

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || "3000";

// add hot-reload related code to entry chunks
Object.keys(webpackBaseConfig.entry).forEach(function (name) {
    webpackBaseConfig.entry[name] = ['react-hot-loader/patch'].concat(webpackBaseConfig.entry[name]);
});

module.exports = merge(webpackBaseConfig, {
    devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'public'),
        filename: 'dist/[name].js'
    },
    module: {
        loaders: [
            // global css
            {
                test: /\.css$/,
                exclude: /[\/\\]src[\/\\]/,
                loaders: [
                    'style?sourceMap',
                    'css'
                ]
            },
            // local scss modules
            {
                test: /\.scss$/,
                exclude: /[\/\\](node_modules|bower_components|public\/)[\/\\]/,
                loaders: [
                    'style?sourceMap',
                    'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]&sourceMap',
                    'postcss',
                    'sass'
                ]
            },
            // local css modules
            {
                test: /\.css$/,
                exclude: /[\/\\](node_modules|bower_components|public\/)[\/\\]/,
                loaders: [
                    'style?sourceMap',
                    'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]&sourceMap'
                ]
            }
        ]
    },
    devServer: {
        contentBase: "./public",
        // do not print bundle build stats
        noInfo: true,
        // enable HMR
        hot: true,
        // embed the webpack-dev-server runtime into the bundle
        inline: true,
        // serve index.html in place of 404 responses to allow HTML5 history
        historyApiFallback: true,

        host: HOST,

        port: PORT
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new DashboardPlugin()
    ]
});
