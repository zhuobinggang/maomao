const crypto = require('crypto')

function md5hex(str /*: string */) {
  const md5 = crypto.createHash('md5')
  return md5.update(str, 'binary').digest('hex')
}


module.exports = {
  md5hex
}