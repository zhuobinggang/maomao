const knex = require('knex')({
  client: 'sqlite3',
  connection: () => ({
    filename: './maomao.sqlite'
  })
});

knex.schema.alterTable('order', t => {
  t.string('payinfo_id')
  t.string('address_id')
}).finally(() => {
  knex.destroy()
})