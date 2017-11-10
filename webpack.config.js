const path = require('path'),
	webpack = require('webpack');

module.exports = {
	entry: './src/js/main.js',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.ProvidePlugin({
			m: 'mithril'
		})
	]
};
