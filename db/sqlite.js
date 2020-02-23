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
  console.log(username,password)
  return getUsersByUsernameAndPass(username, password).then(users => {
    return users.length > 0;
  })
}

function getUsersByName(username){
  return knex('user').where({
    username
  }) 
}

function insertUser(nick, username, md5Pass){
  const sql = 'insert into user(nick, username, password, created_time, updated_time) values(?, ?, ?, datetime("now"), datetime("now"))';
  return knex.raw(sql, [nick, username, md5Pass])
}

function insertSearch(keyword, username){
  const sql = 'insert into search(keyword, user, time) values(?, ?, datetime("now"))';
  return knex.raw(sql, [keyword, username, ]);
}

function getAllSearch(){
  return knex('search').select('*');
}

function getLastFrom(table){
  return knex(table).orderBy('id', 'desc').first()
}

module.exports = {
  getCount,
  getLastFrom,
  incViewCount,
  getTodayViewCnt,
  getUsersByUsernameAndPass,
  isUserExist,
  getViewCount,
  getUsersByName,
  insertUser,
  insertSearch,
  getAllSearch,
}
