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
  knex.raw('insert into view_stastics(id, ip, time) values(3, "test", datetime("now"))').then(result => {
    console.log(result)
    knex.destroy()
  })
}

// rawInsert()
initialize()

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
