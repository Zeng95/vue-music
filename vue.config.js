const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@api': path.resolve(__dirname, 'src/api'),
        '@a': path.resolve(__dirname, 'src/assets'),
        '@c': path.resolve(__dirname, 'src/components'),
        '@s': path.resolve(__dirname, 'src/shared'),
        '@v': path.resolve(__dirname, 'src/views')
      }
    }
  }
}
