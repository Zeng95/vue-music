const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@a': path.resolve(__dirname, 'src/assets'),
        '@c': path.resolve(__dirname, 'src/components'),
        '@v': path.resolve(__dirname, 'src/views')
      }
    }
  }
}
