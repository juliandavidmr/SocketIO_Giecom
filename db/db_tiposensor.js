'use strict';

const knex = require('./connection');
const cdb = require('./config_database');

export class TipoSensor {

	constructor() {
	}

	getTiposSensores(callback) {
		knex
			.select('*')
			.from(cdb.namest.tiposensor)
			.limit(30)
			.orderBy('NombreTipoSensor', 'desc')
			.then(function(rows) {
				callback(rows, true);
			})
			.catch(function(error) {
				console.error("ERROR " + error)
			});
	};

	getTiposSensores_Sensor(callback) {
		knex
			.select(['Dato', 'Dato.insertDate', 'Dato.updateDate', 'Sensor.NombreSensor'])
			.from(cdb.namest.dato)
			.orderBy(cdb.namest.dato + '.insertDate', 'DESC')
			.innerJoin(cdb.namest.sensor, cdb.namest.sensor + '.idSensor', cdb.namest.dato + '.fk_idSensor')
			.limit(100)
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
			.from(cdb.namest.sensor)
			.innerJoin(cdb.namest.tiposensor, cdb.namest.tiposensor + '.idTipoSensor', cdb.namest.sensor + '.fk_idTipoSensor')
			.limit(1)
			.then(function(row) {
				callback(row);
			})
			.catch(function(error) {
				console.error("ERROR " + error)
			});
	};
}
