//增加表之後可以直接運行，不用擔心破壞原來的數據

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
  }).then(() => {
    return knex.schema.createTableIfNotExists('user', table => {
      table.increments('id')
      table.string('nick')
      table.string('username')
      table.string('password')
      table.dateTime('created_time')
      table.dateTime('updated_time')
    })
  }).then(() => {
    return knex.schema.createTableIfNotExists('order', table => {
      table.increments('id')
      table.string('username')
      table.string('item_url')
      table.string('item_title')
      table.integer('state')
      table.dateTime('created_time')
      table.dateTime('updated_time')
    })
  }).then(() => {
    return knex.schema.createTableIfNotExists('payinfo', table => {
      table.increments('id')
      table.string('username')
      table.string('pay_method')
      table.string('pay_id')
    })
  }).then(() => {
    return knex.schema.createTableIfNotExists('address', table => {
      table.increments('id')
      table.string('username')
      table.string('address')
    })
  }).finally(() => {
    knex.destroy()
  })
}

initialize()