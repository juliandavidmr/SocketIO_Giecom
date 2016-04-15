'use strict';

<<<<<<< HEAD
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mysql = require('mysql');
const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
var morgan      = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var flash = require('connect-flash');
//var config = require('./config'); // get our config file
//Conexion con la base de datos
//const db = require('./db/db_sensor');
const db_u = require('./db/db_users');

const routes_index = require('./routes/index');
const routes_sensors = require('./routes/sensors');
const routes_users = require('./routes/user');
//Conexion con la base de datos
const db_sensor 					= require('./db/db_sensor');
const db_tiposensor 			= require('./db/db_tiposensor');

const routes_tiposensors 	= require('./routes/tiposensor');


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());

// app.use(sassMiddleware({
// 	/* Options */
// 	src: __dirname,
// 	dest: path.join(__dirname, 'www/assets'),
// 	debug: true,
// 	outputStyle: 'compressed',
// 	prefix: '/prefix' // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
// }));

//Rutas

app.use(sassMiddleware({
	/* Options */
	src: __dirname,
	dest: path.join(__dirname, 'www/assets/sass'),
	debug: true,
	outputStyle: 'compressed',
	prefix: '/prefix' // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

//Rutas
app.use('/', routes_index);
app.use('/sensor', routes_sensors);
app.use('/tiposensor', routes_tiposensors);
//app.use('/usuario', routes_tiposensors);
//>>>>>>> 3bfa0a7c90faa4779658b048a87fc549320fbc5d

//Crear variable moment como local para todas las plantillas
app.locals.moment = require('moment');
app.locals.moment.locale('es');

// set the view engine to ejs
app.set('view engine', 'ejs');

//folders static
app.use(express.static('www'));
app.use(express.static('www/assets'));

//layout
app.set('layout', false); // defaults to 'layout'
//app.set('superSecret', config.secret); // secret variable

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));
// Connect Flash
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
/* _____________________________________________________________________________
                                SocketIO
   _____________________________________________________________________________
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

/*	socket.on('new note', function(data) {
		// New note added, push to all sockets and insert into db
		notes.push(data);
		io.sockets.emit('new note', data);
		// Use node's db injection format to filter incoming data
		insertNote(data);
	});*/
});

/**
 * Consulta database y envia a los clientes cada 2 s
 * @return {[type]} [description]
 */
var watch = function() {

	db_sensor.getDatosSensores(function(rows) {
		//console.log(JSON.stringify(rows));
		db_tiposensor.getTiposSensores(function(datos) {
			const data = {
				datosensores: rows,
				tiposensores: datos
			}
			//console.log(JSON.stringify(data) + "\n");
			io.sockets.emit('datos datos', data);
		});
	});
	setTimeout(watch, 2000);
}
watch();

// get an instance of the router for api routes
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
app.use('/', routes_index);
app.use('/sensor', routes_sensors);
app.use('/usuarios', routes_users);
/*
 * Escuchador
 * Listen 3000
 * */
http.listen(3000, function() {
	console.log('listening on *:3000');
});
