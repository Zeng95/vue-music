import jsonp from '@a/scripts/jsonp'
import { commonParams, options } from './config.js'

function getSingerList() {
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

function getSingerDetails(singerId) {
  const url = `${process.env.VUE_APP_BASE_URL}/v8/fcg-bin/fcg_v8_singer_track_cp.fcg`

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    singermid: singerId
  })

  return jsonp(url, data, options)
}

export { getSingerList, getSingerDetails }
