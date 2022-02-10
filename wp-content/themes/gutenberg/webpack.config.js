const defaultConfig = require('./node_modules/@wordpress/scripts/config/webpack.config.js');
const path = require('path');

module.exports = {
	...defaultConfig,
	entry: {
		main: path.resolve(__dirname, 'assets/main.js'),
		blocks: path.resolve(__dirname, 'assets/blocks.js'),
		admin: path.resolve(__dirname, 'assets/admin-styles/admin.scss'),
		editor: path.resolve(__dirname, 'assets/editor-styles/editor.scss'),
	},
	output: {
		path: path.resolve(__dirname, 'assets/build'),
		filename: '[name].js',
	},
	optimization: {
		...defaultConfig.optimization,
	},
	module: {
		...defaultConfig.module,
		rules: [...defaultConfig.module.rules],
	},
	plugins: [...defaultConfig.plugins],
};
