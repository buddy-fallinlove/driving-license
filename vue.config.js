module.exports = {
  devServer: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        ws: false,
        target: 'http://v.juhe.cn/jztk',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    }
  }
}