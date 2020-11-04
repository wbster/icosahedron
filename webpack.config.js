const path = require('path')
/** @type {import('webpack').Configuration} */
module.exports = {
	entry: {
		main: path.join(__dirname, './src/index.js')
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, './dist')
	},
	watch: true,
	watchOptions: {
		ignored: ['node_modules', 'dist', 'app.js']
	},
	optimization: {
		moduleIds: 'hashed',
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				}
			}
		}
	}
}
