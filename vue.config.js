module.exports = {
	outputDir: './build',
	devServer: {
		proxy: {
			'^/api': {
				target: 'http://localhost:8000',
				pathRewrite: {
					'^/api': ''
				},
				changeOrigin: true
			}
		}
	},
	configureWebpack: {
		resolve: {
			alias: {
				components: '@/components'
			},
			extensions: ['.jsx', '.ts', '.tsx', '.js', '.scss']
		}
	}
}
