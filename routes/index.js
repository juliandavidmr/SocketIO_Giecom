const express 		= require('express');
const router 			= express.Router();

import { Sensor } from "../db/db_sensor";
import { Usuario } from "../db/db_sensor";
import { Dato } from "../db/db_sensor";

//console.log(db_dato.area);

const dir = '../public/';
var sess;
/*
  GET: Pagina principal
  dashboard
 */
router.get('/', function(req, res) {
    //res.render(dir + 'dashboard',{ layout: 'layout' });
    sess = req.session;
    //Session set when user Request our app via URL
    if(req.isAuthenticated()) {
	/*
	 * This line check Session existence.
	 * If it existed will do some action.
	 */
	res.render(dir + '/views/dashboard');
    }
    else {
	res.redirect('/usuarios/login');
    }
});

/*
  GET: Pagina principal
  dashboard
 */
router.get('/main', function(req, res) {
    //res.render(dir + 'dashboard',{ layout: 'layout' });
    sess = req.session;
    //Session set when user Request our app via URL
    if(req.isAuthenticated()) {	
	res.render(dir + '/views/dashboard');
    }
    else {
	res.redirect('/usuarios/login');
    }
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
	new Sensor().getSensores(function(rows) {
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
