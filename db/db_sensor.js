var knex = require('./connection');

module.exports.getSensores = function(callback) {
  knex
  .select('*')
  .from('Sensor')
  .limit(30)
  .orderBy('NombreSensor', 'desc')
  .then(function(rows) {
    callback(rows);
  })
  .catch(function(error) {
    console.error("ERROR " + error)
  });
};


module.exports.getSensorById = function(idSensor, callback) {
  knex.where('idSensor', '=', idSensor)
  .select('*')
  .from('Sensor')
  .innerJoin('TipoSensor', 'TipoSensor.idTipoSensor', 'Sensor.fk_idTipoSensor')
  .limit(1)
  .then(function(row) {
    callback(row);
  })
  .catch(function(error) {
    console.error("ERROR " + error)
  });
};

module.exports.getDatosSensores = function(callback) {
  knex
  .select('*')
  .from('Dato')
  .orderBy('Dato.insertDate', 'ASC')
  .innerJoin('Sensor', 'Sensor.idSensor', 'Dato.fk_idSensor')
  .limit(100)
  .then(function(rows) {
    console.log("fila: " + JSON.stringify(rows[0]));
    callback(rows);
  })
  .catch(function(error) {
    console.error("ERROR " + error)
  });
};