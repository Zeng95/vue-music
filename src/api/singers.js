import jsonp from '@a/scripts/jsonp'
import { commonParams, options } from './config.js'

const getSingerList = () => {
  const url = `${process.env.VUE_APP_BASE_URL}/v8/fcg-bin/v8.fcg`

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })

  return jsonp(url, data, options)
}

export { getSingerList }
