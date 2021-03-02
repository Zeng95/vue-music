const path = require('path')
const httpClient = require('./src/api/httpClient')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@router': path.resolve(__dirname, 'src/router'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@api': path.resolve(__dirname, 'src/api'),
        '@a': path.resolve(__dirname, 'src/assets'),
        '@c': path.resolve(__dirname, 'src/components'),
        '@s': path.resolve(__dirname, 'src/shared'),
        '@v': path.resolve(__dirname, 'src/views')
      }
    }
  },
  devServer: {
    before(app) {
      app.get('/api/getPlayList', async (req, res) => {
        try {
          const END_POINT = '/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
          const { query } = req
          const { data } = await httpClient.get(END_POINT, { params: query })
          res.json(data)
        } catch (err) {
          console.error(`Server Error: ${err}`)
        }
      })
    }
  }
}
