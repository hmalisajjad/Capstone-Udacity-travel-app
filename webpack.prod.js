const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
// Inside of webpack.config.js:
const {GenerateSW} = require('workbox-webpack-plugin');
//const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    mode: "production",
    entry: './src/client/index.js',
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin({})],
    },
    output: {
        libraryTarget: 'var',
        library: 'Client',
    },
    //future: { webpack5: true, },
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader',  },
            {
                test: "/.js$/",
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /.s?css$/,
                //loader: ExtractTextPlugin.extract('style-loader!css-loader'),
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
              },
            // loader config for angular component styles 
            /*{
                test: /\.(scss|css)$/,
                use: ['raw-loader','sass-loader'], // don't use css-loader for ng2 （unusual）
            },
            // loader config for global css files
            {
                test: /\.scss$/,
                //exclude: [/node_modules/, /src\/app/], 
                use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                loader: ['css-loader','sass-loader']
                })
            },*/
            /*{
                test: /\.css$/,
                use: [
                // [style-loader](/loaders/style-loader)
                { loader: 'style-loader' },
                // [css-loader](/loaders/css-loader)
                {
                loader: 'css-loader',
                options: {
                modules: true
                }
                },
                // [sass-loader](/loaders/sass-loader)
                { loader: 'sass-loader' }
                ]
            },*/
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader, url-loader?limit=25000',
                        options: {
                            name : '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: 'img/'

                        }
                    }
                ],
            },
            {
                test: /\.(html)$/,
                use: [{
                    loader:'html-loader',
                }]
            }
        ]
    },
    plugins: [
        // Other plugins...
       // new GenerateSW({
         //   option: 'value',
        //}),
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({filename: '[name].css'}),
        new WorkboxPlugin.GenerateSW(
            {
                clientsClaim: true,
                skipWaiting: true
            },
       /* new ExtractTextPlugin({
            filename: './style.css'
        }),*/
        )
    ]
};