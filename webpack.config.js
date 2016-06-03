// Project settings

let project = 'react-console';
let library = 'Console';
let externals = {
	"react": "React",
	"react-dom": "ReactDOM",
};



// Build system

let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let options = {
	bundle: process.argv.indexOf('--bundle') != -1,
	dev: process.argv.indexOf('--dev') != -1,
	dist: process.argv.indexOf('--dist') != -1,
	lib: process.argv.indexOf('--lib') != -1,
	default: process.argv.indexOf('--bundle') == -1
		&& process.argv.indexOf('--dev') == -1
		&& process.argv.indexOf('--dist') == -1
		&& process.argv.indexOf('--lib') == -1,
};

let bundle = {
	context: __dirname + "/src",
	entry: './' + project + '.tsx',
	output: {
		path: __dirname + '/dist/bundle',
		filename: project + '.bundle.js',
		library: library,
		libraryTarget: "var",
	},
	module: {
		loaders: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
			},
			{
				test: /\.s?css$/,
				loader: ExtractTextPlugin.extract("css-loader?sourceMap!sass-loader?sourceMap"),
			},
		],
		preLoaders: [
			{
				test: /\.js$/,
				loader: "source-map-loader",
			}
		],
	},
	plugins: [
		new ExtractTextPlugin(project + '.css'),
	],
};

let production_plugins = [
		new ExtractTextPlugin(project + '.min.css'),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"'
		}),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.DedupePlugin()
]


let bundle_min = Object.assign({},bundle, {
	output: {
		path: __dirname + '/dist/bundle',
		filename: project + '.bundle.min.js',
		library: library,
		libraryTarget: "var",
	},
	plugins: production_plugins,
});

let dist = Object.assign({},bundle, {
	output: {
		path: __dirname + '/dist',
		filename: project + '.js',
		library: library,
		libraryTarget: "var",
	},
	externals: externals,
});

let dist_min = Object.assign({},dist, {
	output: {
		path: __dirname + '/dist',
		filename: project + '.min.js',
		library: library,
		libraryTarget: "var",
	},
	plugins: production_plugins,
});

let lib = Object.assign({},dist, {
	output: {
		path: __dirname + '/lib',
		filename: project + '.js',
		library: library,
		libraryTarget: "commonjs2",
	},
	devtool: 'source-map',
});

let development = Object.assign({},bundle, {
	entry: '../example/example.tsx',
	output: {
		path: __dirname + '/example/dist',
		filename: project + '.example.js',
		library: "Example",
		libraryTarget: "var",
	},
	devtool: 'source-map',
	plugins: [
		new ExtractTextPlugin(project + '.example.css'),
	],
});

let targets = [];

if(options.bundle) {
	targets.push(bundle, bundle_min);
}
if(options.dev) {
	targets.push(development);
}
if(options.dist) {
	targets.push(dist, dist_min);
}
if(options.lib) {
	targets.push(lib);
}

if(options.default) {
	module.exports = [ bundle, bundle_min, dist, dist_min, lib, development ];
} else {
	module.exports = targets;
}
