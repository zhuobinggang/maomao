const crypto = require('crypto')
const jwt = require('jwt-simple')

function md5hex(str /*: string */) {
  const md5 = crypto.createHash('md5')
  return md5.update(str, 'binary').digest('hex')
}

function payloadFromJwt(jwtStr, secret){
  //Maybe catch then fallback?
  try{
    return jwt.decode(jwtStr, secret)
  }catch(e){
    console.error('Decode jwt error: ', jwtStr);
    return null;
  }
}

function jwtFromObject(object, secret){
  try{
    return  jwt.encode(object, secret);
  }catch(e){
    console.error('Encode object to jwt error: ', object);
    return null
  }
}


module.exports = {
  md5hex, payloadFromJwt, jwtFromObject,
}