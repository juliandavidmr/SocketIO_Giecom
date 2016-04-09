/* ____________________________________________________________________________
                          RUTAS
   ____________________________________________________________________________
*/

var express = require('express');
var router = express.Router();
var moment = require('moment');
var db = require('../db/db_sensor');

var dir = '../www/';
moment.locale('es');

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
  GET: Ver un sensor
  list a sensor
 */
router.get('/show/:idSensor', function(req, res, next) {
	var idSensor = req.params['idSensor'];
	db.getSensorById(idSensor, function(row) {
		res.render(dir + 'views/sensors/show', {
			sensor: row[0]
		});
	});
});


module.exports = router;
