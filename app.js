'use strict';

const express 				= require('express');
const app 						= express();
const http 						= require('http').Server(app);
const io 							= require('socket.io')(http);
const mysql 					= require('mysql');
const bodyParser 			= require('body-parser');
const sassMiddleware 	= require('node-sass-middleware');
const morgan     	 		= require('morgan');
const cookieParser 		= require('cookie-parser');
const session 				= require('express-session');
const passport 				= require('passport');
const LocalStrategy 	= require('passport-local').Strategy;
//var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
const flash 					= require('connect-flash');
//var config = require('./config'); // get our config file

const routes_index 		= require('./routes/index');
const routes_sensors 	= require('./routes/sensors');
const routes_users 		= require('./routes/user');
const routes_tiposensors 	= require('./routes/tiposensor');

import { Sensor } from "./db/db_sensor";
import { TipoSensor } from "./db/db_tiposensor";


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());

/*
================================================================================
																		RUTAS
================================================================================
 */
app.use('/', routes_index);
app.use('/sensor', routes_sensors);
app.use('/tiposensor', routes_tiposensors);
app.use('/usuarios', routes_users);

/*
================================================================================
															MOTOR DE VISTAS
================================================================================
 */
app.set('view engine', 'ejs');


/*
================================================================================
													VARIABLES LOCALES EXPRESS
================================================================================
 */
app.locals.moment = require('moment');
app.locals.moment.locale('es');


/*
================================================================================
											CARPETAS ESTATICAS DEL SERVIDOR
================================================================================
 */
app.use(express.static('public'));
app.use(express.static('public/assets'));


/*
================================================================================
															LAYOUT
		Estado:			 false
		Descripcion: Se define la ruta del layout, false si no se usará alguna
================================================================================
 */
app.set('layout', false); // defaults to 'layout'
//app.set('superSecret', config.secret); // secret variable


/*
================================================================================
															SEGURIDAD
	Express Session
	Descripcion: Almacenamiento de mensajes en la sesion con flash
================================================================================
 */
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Passport init
app.use(passport.initialize());
app.use(passport.session());


/*
================================================================================
																SOCKET IO
	Descripcion: Tiempo real
================================================================================
 */

// Define/initialize our global vars
let notes = []; //Todas las notas registradas
let socketCount = 0; // Cantidad de usuarios conectados

io.sockets.on('connection', function(socket) {
	// Socket has connected, increase socket count
	socketCount++;
	// Let all sockets know how many are connected
	io.sockets.emit('users connected', socketCount);

	socket.on('disconnect', function() {
		// Decrease the socket count on a disconnect, emit
		socketCount--;
		io.sockets.emit('users connected', socketCount)
	});
});

/**
 * Consulta database y envia a los clientes cada 2 s
 * @return {[type]} [description]
 */
var watch = function() {
	new Sensor().getDatosSensores(function(rows) {
		new Sensor().getSensores(function(datos) {
			const data = {
				datosensores: rows,
				tiposensores: datos
			}
			io.sockets.emit('datos datos', data);
		});
	});
	setTimeout(watch, 2000);
}
watch();

/*
Insertar nota en la base de datos
Luego se emite la nota insertada a todos los clientes activos
Despues se envia un json al cliente que realiza la solicitud post
*/
app.post('/add/:item', function(req, res) {
	let data = req.params['item'];
	data = {
		note: data
	};
	insertNote(data) //Si se inserta correctamente entonces se emite a los clientes conectados el nuevo dato
	res.json(data); //Se retorna el varlo
});

/*
 * Escuchador
 * Listen 3000
 * */
http.listen(3000, function() {
	console.log('listening on *:3000');
});
