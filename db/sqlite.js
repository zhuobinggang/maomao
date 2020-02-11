const knex = require('knex')({
  client: 'sqlite3',
  connection: () => ({
    filename: './maomao.sqlite'
  })
});

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

module.exports = {
  getCount,
  incViewCount,
  getTodayViewCnt,
}
