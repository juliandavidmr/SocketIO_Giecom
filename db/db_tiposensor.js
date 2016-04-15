var knex = require('./connection');

module.exports.getTiposSensores = function(callback) {
	knex
		.select('*')
		.from('TipoSensor')
		.limit(30)
		.orderBy('NombreTipoSensor', 'desc')
		.then(function(rows) {
			callback(rows, true);
		})
		.catch(function(error) {
			console.error("ERROR " + error)
		});
};

module.exports.getTiposSensores_Sensor = function(callback) {
  knex
  .select(['Dato', 'Dato.insertDate', 'Dato.updateDate', 'Sensor.NombreSensor'])
  .from('Dato')
  .orderBy('Dato.insertDate', 'DESC')
  .innerJoin('Sensor', 'Sensor.idSensor', 'Dato.fk_idSensor')
  .limit(100)
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
