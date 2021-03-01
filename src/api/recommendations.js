import axios from 'axios'
import jsonp from '@a/scripts/jsonp'
import { commonParams, options } from './config.js'

function getRecommendationList() {
  const url = `${process.env.VUE_APP_BASE_URL}/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg`

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

function getPlayList() {
  const END_POINT = '/api/getPlayList'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(END_POINT, { params: data })
}

export { getRecommendationList, getPlayList }
