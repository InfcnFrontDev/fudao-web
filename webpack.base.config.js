let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let glob = require('glob')

let getEntry = (globPath) => {
	let files = glob.sync(globPath);
	let entries = {}, file, dirname, basename, pathname, extname;
	for (let i = 0; i < files.length; i++) {
		file = files[i];

		dirname = path.dirname(file);
		extname = path.extname(file);
		basename = path.basename(file, extname);
		pathname = path.join(dirname, basename);

		entries[basename] = file + '/index.jsx';
	}
	return entries;
}

let getHtmlPlugins = (entries) => {
	let htmlPlugins = [];
	for (let key in entries) {
		htmlPlugins.push(new HtmlWebpackPlugin({
			filename: '' + key + '.html',
			template: './src/views/' + key + '/index.html',
			inject: true,
			title: key,
			chunks: [key]
		}));
	}
	return htmlPlugins;
}

let entry = getEntry('./src/views/*');
let plugins = getHtmlPlugins(entry);

module.exports = {
	entry,
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components|public\/)/,
				loader: "babel"
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				exclude: /(node_modules|bower_components)/,
				loader: "file"
			},
			{
				test: /\.(woff|woff2)$/,
				exclude: /(node_modules|bower_components)/,
				loader: "url?prefix=font/&limit=5000"
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				exclude: /(node_modules|bower_components)/,
				loader: "url?limit=10000&mimetype=application/octet-stream"
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				exclude: /(node_modules|bower_components)/,
				loader: "url?limit=10000&mimetype=image/svg+xml"
			},
			{
				test: /\.gif/,
				exclude: /(node_modules|bower_components)/,
				loader: "url-loader?limit=10000&mimetype=image/gif"
			},
			{
				test: /\.jpg/,
				exclude: /(node_modules|bower_components)/,
				loader: "url-loader?limit=10000&mimetype=image/jpg"
			},
			{
				test: /\.png/,
				exclude: /(node_modules|bower_components)/,
				loader: "url-loader?limit=10000&mimetype=image/png"
			}
		]
	},
	plugins
};
