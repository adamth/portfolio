const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';

const cssDev = ['style-loader','css-loader?sourceMap', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'postcss-loader', 'sass-loader']
});

const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
	entry: {
        app: './src/js/app.js'
    },
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'js/[name].bundle.js'
	},
    module: {
        rules: [
            {
                test: /\.scss$/, 
                use: cssConfig
            },
            {
                test: /\.pug/,
                use:['html-loader?minimize=false','pug-html-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/'
                            }
                    },
                    {
                        loader: 'image-webpack-loader',
                    },
                  ]
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:'Adam Th dot com',
            hash: true,
            template: './src/index.pug'
        }),
        new ExtractTextPlugin({
            filename: '/css/[name].css',
            disable: !isProd,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
          })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        open: true
    }
};