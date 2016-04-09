/**
 * Created by julian on 9/03/16.
 */

'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mysql = require('mysql');
const bodyParser = require('body-parser');
//Conexion con la base de datos
const db = require('./db/db_sensor');

const routes_index = require('./routes/index');
const routes_sensors = require('./routes/sensors');


//app.use(bodyParser());
app.use(bodyParser.urlencoded({
	extended: false
}))

//Rutas
app.use('/', routes_index);
app.use('/sensor', routes_sensors);

//Crear variable moment como local para todas las plantillas
app.locals.moment = require('moment');

// set the view engine to ejs
app.set('view engine', 'ejs');

//folders static
app.use(express.static('bower_components'));
app.use(express.static('www'));
app.use(express.static('www/assets'));

//layout
app.set('layout', false); // defaults to 'layout'

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

	socket.on('new note', function(data) {
		// New note added, push to all sockets and insert into db
		notes.push(data);
		io.sockets.emit('new note', data);
		// Use node's db injection format to filter incoming data
		insertNote(data);
	});

	/*
	Apenas se un cliente se conecta, se le envian todos los datos
	capturados por los sensores
	*/
	db.getDatosSensores(function(rows) {
		io.sockets.emit('initial notes', rows);
	});
});

io.on('connection', function(socket) {
	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});
});

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
