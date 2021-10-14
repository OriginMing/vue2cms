module.exports = {
  outputDir: './build',
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      },
      extensions: ['.jsx', '.ts', '.tsx', '.js', '.scss']
    }
  }
}
