'use strict';

const express = require('express');
const router = express.Router();
const db_sensor = require('../db/db_sensor');
const db_tiposensor = require('../db/db_tiposensor');
const db = require('../db/db_sensor');
const dir = '../www/';

/*
  GET: Listado de sensores
  list sensor
 */
router.get('/', function(req, res, next) {
	db_sensor.getSensores(function(rows) {
		res.render(dir + 'views/sensors/list', {
			sensores: rows
		});
	});
});

/*
  GET: Listado de sensores
  list sensor
 */
router.get('/register', function(req, res, next) {
	db_tiposensor.getTiposSensores(function(rows) {
		res.render(dir + 'views/sensors/register', {
			tipos_sensores: rows
		});
	});
});

/*
  GET: Listado de sensores
  list sensor
 */
router.post('/register', function(req, res, next) {
	const new_sensor = {
		NombreSensor: req.body.NombreSensor,
		Referencia: req.body.Referencia,
		Descripcion: req.body.Descripcion,
		Maximo: req.body.Maximo,
		Minimo: req.body.Minimo,
		Altura: req.body.Altura,
		fk_idTipoSensor: req.body.fk_idTipoSensor
	}
	var ne = {};
	var estado = false;
	db_sensor.insertSensor(new_sensor, function(row, est) {
		if (row > 0) {
			res.redirect('/sensor');
		} else {
			res.send('No se registro');
		}
	});
});

/**
 * View de graficos en tiempo real
 * @param  {[type]} '/graficos'   [description]
 * @param  {[type]} function(req, res,          next [description]
 * @return {[type]}               [description]
 */
router.get('/graficos', function(req, res, next) {
	db.getSensores(function(rows) {
		res.render(dir + 'views/sensors/prueba_grafico');
	});
});

/*
  GET: Ver un sensor
  list a sensor
 */
router.get('/show/:idSensor', function(req, res, next) {
	const idSensor = req.params['idSensor'];
	db_sensor.getSensorById(idSensor, function(row) {
		if (row) {
			res.render(dir + 'views/sensors/show', {
				sensor: row[0]
			});
		}
		res.redirect('/list');
	});
});

module.exports = router;
