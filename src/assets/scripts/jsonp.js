import originJSONP from 'jsonp'

function parameters(data) {
  let url = ''

  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : ''

    url += `&${k}=${encodeURIComponent(value)}`
  }

  return url ? url.substring(1) : ''
}

function jsonp(url, data, options) {
  // Gives the position of the first occurrence of the string passed as parameter in the current string.
  // Returns -1 if the string is not found.
  const queryString = (url.indexOf('?') === -1 ? '?' : '&') + parameters(data)
  const fullURL = url + queryString

  return new Promise((resolve, reject) => {
    originJSONP(fullURL, options, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export default jsonp
