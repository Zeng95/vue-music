import jsonp from '@a/scripts/jsonp'
import { commonParams, options } from './config.js'

const getRecommendations = () => {
  const url =
    'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

export { getRecommendations }
