const knex = require('knex')({
  client: 'sqlite3',
  connection: () => ({
    filename: './maomao.sqlite'
  })
});

function initialize(){
  return knex.schema.createTableIfNotExists('view_stastics', table => {
    table.increments('id')
    table.string('ip')
    table.dateTime('time')
    // table.timestamp('time')
  }).then(() => {
    return knex.schema.createTableIfNotExists('search_record', table => {
      table.increments('id')
      table.string('keyword')
      table.dateTime('time')
    })
  }).finally(() => {
    knex.destroy()
  })
}

initialize()