const knex = require('knex')({
  client: 'sqlite3',
  connection: () => ({
    filename: './maomao.sqlite'
  })
});
const U = require('../utils');

function getCount(tableName){
  return knex(tableName).count('*').then(result => {
    return result[0]['count(*)']
  })
}

function incViewCount(ip){
  const sql = `insert into view_stastics(ip, time) values("${ip}", datetime("now"))`;
  return knex.raw(sql)
}

function getTodayViewCnt(){
  return knex('view_stastics').whereRaw('time > date("now")').count('*').then(result => {
    console.log(result)
    return result[0]['count(*)']
  })
}

function getViewCount(){
  console.log('get view count')
  return knex('view_stastics').count('*').then(count => {
    console.log(count)
    return count[0]['count(*)'];
  })
}

function getUsersByUsernameAndPass(username, password){
  const md5Pass = U.md5hex(password)
  return knex('user').where({
    username, password: md5Pass
  })
}

function isUserExist(username, password){
  return getUsersByUsernameAndPass(username, password).then(users => {
    return users.length > 0;
  })
}

module.exports = {
  getCount,
  incViewCount,
  getTodayViewCnt,
  getUsersByUsernameAndPass,
  isUserExist,
}
