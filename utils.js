const crypto = require('crypto')
const jwt = require('jwt-simple')

function md5hex(str /*: string */) {
  const md5 = crypto.createHash('md5')
  return md5.update(str, 'binary').digest('hex')
}

function payloadFromJwt(jwtStr, secret){
  //TODO: Maybe catch then fallback?
  return jwt.decode(jwtStr, secret)
}

function jwtFromObject(object, secret){
  return jwt.encode(object, secret);
}


module.exports = {
  md5hex, payloadFromJwt, jwtFromObject,
}