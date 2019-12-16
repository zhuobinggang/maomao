const knex = require('knex')({
  client: 'sqlite3',
  connection: () => ({
    filename: './maomao.sqlite'
  })
});

function incViewCount(ip){
  const sql = `insert into view_stastics(ip, time) values("${ip}", datetime("now"))`;
  // console.log(sql)
  return knex.raw(sql)
  // return knex('view_stastics').insert({ip: ip, time: new Date().getTime()}).then(() => {
  // })
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

module.exports= {
  incViewCount,
  getTodayViewCnt,
}