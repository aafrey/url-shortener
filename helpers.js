const validUrl = require('validator')

const parseUrl = urlParams => {
   return urlParams.url + urlParams[0]
}

const isUrlValid = url => {
   if (!validUrl.isURL(url)) {
      return false
   }
   return true
}

module.exports = {
   parseUrl,
   isUrlValid
}
