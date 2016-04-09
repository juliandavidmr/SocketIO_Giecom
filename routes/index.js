/* ____________________________________________________________________________
                          RUTAS
   ____________________________________________________________________________
*/

var express = require('express');
var router = express.Router();
var db_sensor = require('../db/db_sensor');

var dir = '../www/';

/*
  GET: Pagina principal
  dashboard
 */
router.get('/', function(req, res) {
	//res.render(dir + 'dashboard',{ layout: 'layout' });
	res.render(dir + 'views/dashboard');
});

/*
  GET: Menu de usuario
  user
 */
router.get('/user', function(req, res) {
	console.log("usuario: " + req.user);
	res.render(dir + 'views/user');
});

/*
  GET: Menu de tablas
  table
 */
router.get('/table', function(req, res) {
	res.render(dir + 'views/table');
});

/*
  GET: Menu de typography
  typography
 */
router.get('/typography', function(req, res) {
	res.render(dir + 'views/typography');
});

/*
  GET: Menu de iconos
  icons
 */
router.get('/icons', function(req, res) {
	res.render(dir + 'views/icons');
});

/*
  GET: Menu de mapas
  maps
 */
router.get('/maps', function(req, res) {
	res.render(dir + 'views/maps');
});

/*
  GET: Menu de notificationes
  notifications
 */
router.get('/notifications', function(req, res) {
	res.render(dir + 'views/notifications');
});

/*
  GET: Menu de listado de registros
  list
 */
router.get('/list', function(req, res) {
	db_sensor.getSensores(function(rows) {
		res.render(dir + 'views/list', {
			sensores: rows
		});
	});
});


module.exports = router;
