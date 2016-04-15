/* ____________________________________________________________________________
                          RUTAS
   ____________________________________________________________________________
*/

const express = require('express');
const router = express.Router();
const db_sensor = require('../db/db_sensor');
const db_u = require('../db/db_users');
const db_dato = require('../db/db_dato');

//console.log(db_dato.area);

const dir = '../www/';

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

/**
 * Menu de mapas
 * @param  GET				'/maps'
 * @param  function		function(req, res
 * @return view       view/maps
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

router.get('/logout', function(req, res){
    req.logout();

    //req.flash('success_msg', 'You are logged out');

    res.redirect('/usuarios/login');
});
module.exports = router;
