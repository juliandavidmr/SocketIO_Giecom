/**
 * Created by julian on 9/03/16.
 */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var bodyParser = require('body-parser');

//Conexion con la base de datos
var knex = require('./db/connection');

var routes_index = require('./routes/index');
var routes_sensors = require('./routes/sensors');


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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Ruta no encontrada');
  err.status = 404;
  next(err);
});

/* _____________________________________________________________________________
                                SocketIO
   _____________________________________________________________________________
*/
// Define/initialize our global vars
var notes = []; //Todas las notas registradas
var socketCount = 0; // Cantidad de usuarios conectados

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

	//Apenas se un cliente se conecta, se le envian todas los datos de los sensores y los capturados por estos
	consultarDatosSensores(socket);
	getSensores(socket);
	//var myVar = setInterval(consultarDatosSensor(socket), 1000);
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
	var data = req.params['item'];
	data = {
		note: data
	};
	insertNote(data) //Si se inserta correctamente entonces se emite a los clientes conectados el nuevo dato
	res.json(data); //Se retorna el varlo
});


/* ____________________________________________________________________________
                          				MYSQL
   ____________________________________________________________________________
*/
/*
Consulta todas las notas y las emite un arreglo json a todas los clientes activos
*/
function consultarDatosSensores(socket) {
	knex('Dato')
  .join('Sensor', 'Dato.fk_idSensor', '=', 'Sensor.idSensor')
  .select('*')
	.limit(10)
	.orderBy('NombreSensor', 'desc')
	.then(function(rows) {
		socket.emit('initial notes', rows)
		return rows;
	})
	.catch(function(error) {
		console.error(error)
	});
}


/*
Consulta todas los datos pertenecientes a un sensor
y las emite en arreglo json a todas los clientes activos
*/
function getBySensor(socket, idSensor) {
	/*notes = [];
	db.query('SELECT * FROM Dato INNER JOIN Sensor ON Sensor.idSensor = Dato.fk_idSensor AND Sensor.idSensor = ? ORDER BY Sensor.updateDate DESC', [idSensor])
		.on('result', function(data) {
			// Push results onto the notes array
			notes.push(data);
		})
		.on('end', function() {
			// Only emit notes after query has been completed
			socket.emit('initial notes', notes)
		});*/
}

/*
Consulta todos los sensores
y emite en un arreglo json a todas los clientes activos
*/
function getSensores(socket) {
	knex.select('*').from('Sensor')
  .limit(10)
	.orderBy('NombreSensor', 'desc')
  .then(function(rows) {
		socket.emit('sensores', rows)
    return rows;
  })
  .catch(function(error) {
    console.error(error)
  });
}


/*
Insertar una nota en la base de datos
return true si la operacion fue exitosa

function insertNote(data) {
	db.query('INSERT INTO Datos (dato) VALUES (?)', [data.note], function(err, results) {
		if (err) {
			console.log("Error:" + err);
			return false;
		}
		//La operacion insert fue realizada exitosamente,
		//se procede a emitir el resultado a los clientes
		//results: {"fieldCount":0,"affectedRows":1,"insertId":56,"serverStatus":2,"warningCount":0,"message":"","protocol41":true,"changedRows":0}
		io.emit('new note', data);

		console.log((results.affectedRows) + " rows affected");
		return true;
	});
}*/

/*
 * Escuchador
 * Listen 3000
 * */
http.listen(3000, function() {
	console.log('listening on *:3000');
});
