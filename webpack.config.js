const path = require( 'path' );
const webpack = require( 'webpack' );

module.exports = {
	context: __dirname,
	entry: {
		'form-validation-constructor.min': './scripts/form-validation-constructor',
	},
	output: {
		path: './public', filename: '[name].js'
	},
	resolve: {
		extensions: ['', '.js']
	},
	devtool: '#cheap-module-source-map',
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015']
				}
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			mangle: true,
			compress: {
				warnings: false,
				sequences: true,
				dead_code: true,
				conditionals: true,
				booleans: true,
				unused: true,
				if_return: true,
				join_vars: true,
				drop_console: true
			}
		})
	]
};
