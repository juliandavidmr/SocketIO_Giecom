var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '192.168.56.10',
    user     : 'sebas--dev',
    password : 'sebas--dev',
    database : 'bd_sensor'
  },
  pool: {
    min: 0,
    max: 10
  }
});

module.exports = knex;
