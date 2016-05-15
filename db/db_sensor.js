'use strict';

const knex = require('./connection');
const cdb = require('./config_database');

export class Sensor {

	constructor() {
	}

	getSensores(callback) {
		knex
			.select('*')
			.from(cdb.namest.sensor)
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
			.from(this.name_table)
			.innerJoin(cdb.namest.tiposensor, cdb.namest.tiposensor + '.idTipoSensor', cdb.namest.sensor + '.fk_idTipoSensor')
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
			.select(['Dato', cdb.namest.dato  + '.insertDate', cdb.namest.dato + '.fk_idSensor', cdb.namest.dato + '.updateDate', cdb.namest.sensor + '.NombreSensor', cdb.namest.sensor + '.Descripcion', cdb.namest.sensor + '.Maximo', cdb.namest.sensor + '.Minimo', cdb.namest.sensor + '.Altura'])
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

	getDatosSensoresById(idsensor, callback) {
		knex.where('fk_idSensor', '=', idsensor)
			.select(['Dato', cdb.namest.dato + '.insertDate', cdb.namest.dato + '.fk_idSensor', cdb.namest.dato + '.updateDate', cdb.namest.sensor + '.NombreSensor'])
			.from(cdb.namest.dato)
			.orderBy('dato.insertDate', 'DESC')
			.innerJoin(cdb.namest.sensor, cdb.namest.sensor + '.idSensor', cdb.namest.dato + '.fk_idSensor')
			.limit(100)
			.then(function(rows) {
				callback(rows);
			})
			.catch(function(error) {
				console.error("ERROR " + error)
			});
	};

  insertSensor(new_sensor, callback) {
		knex(cdb.namest.sensor)
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
