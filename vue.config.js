const webpack = require("webpack");
module.exports = {
	publicPath: '/',
	// 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
	productionSourceMap: false,
	configureWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			// 生产环境
			config.plugins.push(
				new webpack.optimize.MinChunkSizePlugin({
					minChunkSize: 100000,
				})
			);
		} else {
			// 开发环境
		}
	},
	devServer: {
		port: 8180,
		hot: true, //热加载
		host: "0.0.0.0",
		https: false,
		// 自动启动浏览器
		open: false,
	}
};