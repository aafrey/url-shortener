const validUrl = require('validator')

const parseUrl = urlParams => {
   return urlParams.url + urlParams[0]
}

const isUrlValid = url => {
   if (!validUrl.isURL(url) && url.slice(0,4) !== 'http') {
      return false
   }
   return true
}

module.exports = {
   parseUrl,
   isUrlValid
}
