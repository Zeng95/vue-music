const axios = require('axios')

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    referer: 'https://c.y.qq.com/',
    host: 'c.y.qq.com'
  }
})

module.exports = httpClient
