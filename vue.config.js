
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
	configureWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			return {
				plugins: [
					new CompressionPlugin({ // 开启Gzip压缩
						test: /\.js$|\.html$\.css/, // 配置需要压缩的文件名后缀名
						threshold: 10240, // 对超过10K的文件进行压缩
						deleteOriginalAssets: false // 是否删除原文件
					})
				]
			}
		}
	},
	devServer: {
		overlay: {
			warnings: true,
			errors: true,
			// 让浏览器overlay时显示警告和错误
		},
		host: 'localhost',
		port: 8080, // 端口号
		https: false,
		open: true, // 自动启动浏览器
		hotOnly: true, // 热更新
		headers: {
			'Access-Control-Allow-Origin': '*' // 允许所有来源跨域
		},
		proxy: {
			'/api': {
				target: 'http://xxxx.xxxx.xxxxx', // 请求域名
				changeOrigin: true, // 是否开启跨域
				ws: true, // 启用webSockets
				pathRewrite: {
					'^/api': '' // 替换规则
				}
			}
		}
	}
}