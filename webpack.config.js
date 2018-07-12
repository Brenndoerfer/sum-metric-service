const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: {
        'public': ['babel-polyfill', './public/javascripts/public.js'],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public/javascripts/dist')
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'public/js'),
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    // externals: {
    //     jquery: 'jQuery'
    // },
    plugins:
        [
            new CleanWebpackPlugin(['public/javascripts/dist']),
            // new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')}),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            })
        ],
};
