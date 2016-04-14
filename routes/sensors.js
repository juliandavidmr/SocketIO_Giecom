/* ____________________________________________________________________________
                          RUTAS
   ____________________________________________________________________________
*/

'use strict';

const express = require('express');
const router = express.Router();
const db = require('../db/db_sensor');
const dir = '../www/';

/*
  GET: Listado de sensores
  list sensor
 */
router.get('/', function(req, res, next) {
	db.getSensores(function(rows) {
		res.render(dir + 'views/sensors/list', {
			sensores: rows
		});
	});
});

/*
  GET: Listado de sensores
  list sensor
 */
router.get('/prueba', function(req, res, next) {
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
	db.getSensorById(idSensor, function(row) {
		if (row) {
			res.render(dir + 'views/sensors/show', {
				sensor: row[0]
			});
		}
		res.redirect('/list');
	});
});

module.exports = router;
