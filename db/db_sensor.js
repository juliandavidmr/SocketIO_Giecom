'use strict';

const knex = require('./connection');

export class Sensor {

	constructor() {
	}

	getSensores(callback) {
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

  getSensorById(idSensor, callback) {
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

	getDatosSensores(callback) {
		knex
			.select(['Dato', 'Dato.insertDate', 'Dato.fk_idSensor', 'Dato.updateDate', 'Sensor.NombreSensor'])
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

		getDatosSensoresById(idsensor, callback) {
			knex.where('fk_idSensor', '=', idsensor)
				.select(['Dato', 'Dato.insertDate', 'Dato.fk_idSensor', 'Dato.updateDate', 'Sensor.NombreSensor'])
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

  insertSensor(new_sensor, callback) {
		knex('Sensor')
			.insert(new_sensor)
			.returning('*')
			.then(function(row) {
				console.log("El row: " + row);
				callback(row);
			})
			.catch(function(error) {
				console.error("ERROR " + error)
			});
	};
}

//module.exports = new Sensor();
