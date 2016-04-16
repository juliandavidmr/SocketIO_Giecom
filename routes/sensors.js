'use strict';

const express = require('express');
const router = express.Router();
const db_tiposensor = require('../db/db_tiposensor');
import { Sensor } from "../db/db_sensor";

const dir = '../public/';

/*
  GET: Listado de sensores
  list sensor
 */
router.get('/', function(req, res, next) {
	new Sensor().getSensores(function(rows) {
		res.render(dir + 'views/sensors/list', {
			sensores: rows
		});
	});
});

/*
  GET: Listado de sensores
  list sensor
 */
router.get('/register', ensureAuthenticated, function(req, res, next) {
	db_tiposensor.getTiposSensores(function(rows) {
		res.render(dir + 'views/sensors/register', {
			tipos_sensores: rows
		});
	});
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/usuarios/login');
	}
}

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
	new Sensor().insertSensor(new_sensor, function(row, est) {
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
	res.render(dir + 'views/sensors/graficos');
});

/*
  GET: Ver un sensor
  list a sensor
 */
router.get('/show/:idSensor', function(req, res, next) {
	const idSensor = req.params['idSensor'];
	new Sensor().getSensorById(idSensor, function(row) {
		if (row) {
			res.render(dir + 'views/sensors/show', {
				sensor: row[0]
			});
		}
		res.redirect('/list');
	});
});

module.exports = router;
