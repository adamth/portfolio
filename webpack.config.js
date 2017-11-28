var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
	entry: './src/js/app.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
    module: {
        rules: [
            {
                test: /\.scss$/, 
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader']
                })
            },
            {
                test: /\.pug/,
                use:['html-loader','pug-html-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:'Adam Th dot com',
            hash: true,
            template: './src/index.pug'
        }),
        new ExtractTextPlugin('style.css')
    ],
    devServer: {
        open: true
    }
};