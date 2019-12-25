const U = require('../utils')

const knex = require('knex')({
  client: 'sqlite3',
  connection: () => ({
    filename: './maomao.sqlite'
  })
});

function initialize(){
  knex.schema.createTableIfNotExists('view_stastics', table => {
    table.increments('id')
    table.string('ip')
    table.dateTime('time')
    // table.timestamp('time')
  }).finally(() => {
    knex.destroy()
  })
}

function showAllStastics(){
  knex.select('id', 'ip', 'time').from('view_stastics').then(things => {
    console.log(things)
  }).finally(() => {
    knex.destroy()
  })
}

function insert(){
  knex('view_stastics').insert({ip: 'test2', time: 'date("now")'}).then(() => {
    knex.destroy();
  })
}

function getCount(){
  knex('view_stastics').count('*').then(count => {
    console.log(count)
    knex.destroy()
    return count[0]['count(*)'];
  })
}


function selectAll(){
  knex('view_stastics').select('*').then(result => {
    console.log(result)
    knex.destroy()
  })
}
function getTodayViewCnt(){
  knex('view_stastics').whereRaw('time > date("now")').select('*').then(result => {
    console.log(result)
    knex.destroy()
  })
}

function rawInsert(){
  knex.raw('insert into view_stastics(id, ip, time) values(1, "test", datetime("now"))').then(result => {
    console.log(result)
    knex.destroy()
  })
}

function test_register(username, password, nick){
  //Check if username used
  knex('user').where({username}).then(users => {
    console.log(users)
    if(users.length > 0){ //Repeated
      console.log('Used username!')
      return Promise.resolve('yes')
    }else{
      const sql = `insert into user(nick, username, password, created_time, updated_time) values(?, ?, ?, datetime("now"), datetime("now"))`;
      console.log(sql)
      return knex.raw(sql, [nick, username, password])
      console.log('Insert done!')
    }
  }).finally(() => {
    knex.destroy()
  })
}

function getAllUsers(){
  knex('user').select('*').then(res => {
    console.log(res)
  })
}

function insertUserWithMd5pass(username, password){
  const md5Pass = U.md5hex(password)
  return test_register(username, md5Pass, 'kobako')
}

function getUserByUsernameAndPass(username, password){
  const md5Pass = U.md5hex(password)
  return knex('user').where({
    username, password: md5Pass
  }).then(user => {
    console.log(user)
  })
}

// getUserByUsernameAndPass('kobako2', '124')
// insertUserWithMd5pass('kobako2', '123')

// test_register('kobako9', 'dd', 'kobako')

getAllUsers()

// rawInsert()
// initialize()

// getTodayViewCnt()

// insert()
// selectAll()

// showAllStastics()

// getCount()

// knex('view_stastics').insert({id: 3, ip: 'fuck', time: new Date().getTime()}).then(() => {
//   return knex.select('id', 'ip', 'time').from('view_stastics')
// }).then(things => {
//   console.log(things)
// }).finally(() => {
//   knex.destroy()
// })
