var knex = require('./connection');

module.exports.getSensores = function(callback) {
  knex.select('*').from('Sensor')
  .limit(10)
  .orderBy('NombreSensor', 'desc')
  .then(function(rows) {
    callback(rows);
  })
  .catch(function(error) {
    console.error("ERROR " + error)
  });
};
