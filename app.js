/**
 * Created by julian on 9/03/16.
 */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');

//app.use(bodyParser());
app.use(bodyParser.urlencoded({
	extended: false
}))

// set the view engine to ejs
app.set('view engine', 'ejs');

//folders static
app.use(express.static('bower_components'));
app.use(express.static('www'));

//layout
app.set('layout', false); // defaults to 'layout'
app.use(expressLayouts);

//config db connection
var db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'bd_sensor'
});

/*
Log any errors connected to the db
Conectar a la base de datos
*/
db.connect(function(err) {
	if (err) {
		console.log("ERROR al conectar base de datos, error: " + err)
	} else {
		console.log("Base de datos conectada.");
	}
});

/*
Realizar un query de prueba para confirmar que se ha efectuado
 la conexion exitosamente.
*/
db.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
	if (err) throw err;

	console.log('Conexion verificada: ', rows[0].solution == '2' ? 'OK' : 'Fallido');
});


/* ____________________________________________________________________________
                          RUTAS
   ____________________________________________________________________________
*/
/*
  GET: Pagina principal
  dashboard
 */
app.get('/', function(req, res) {
	//res.render(__dirname + '/www/dashboard',{ layout: 'layout' });
	res.render(__dirname + '/www/views/dashboard');
});

/*
  GET: Menu de usuario
  user
 */
app.get('/user', function(req, res) {
	console.log("usuario: " + req.user);
	res.render(__dirname + '/www/views/user');
});

/*
  GET: Menu de tablas
  table
 */
app.get('/table', function(req, res) {
	res.render(__dirname + '/www/views/table');
});

/*
  GET: Menu de typography
  typography
 */
app.get('/typography', function(req, res) {
	res.render(__dirname + '/www/views/typography');
});

/*
  GET: Menu de iconos
  icons
 */
app.get('/icons', function(req, res) {
	res.render(__dirname + '/www/views/icons');
});

/*
  GET: Menu de mapas
  maps
 */
app.get('/maps', function(req, res) {
	res.render(__dirname + '/www/views/maps');
});

/*
  GET: Menu de notificationes
  notifications
 */
app.get('/notifications', function(req, res) {
	res.render(__dirname + '/www/views/notifications');
});

/*
  GET: Menu de listado de registros
  list
 */
app.get('/list', function(req, res) {
	res.render(__dirname + '/www/views/list');
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

	//Apenas se un cliente se conecta, se le envian todas las notas disponibles
	consultarNotas(socket);
	//var myVar = setInterval(consultarNotas(socket), 1000);
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

/*
Consulta todas las notas y las emite un arreglo json a todas los clientes activos
*/
function consultarNotas(socket) {
	notes = [];
	db.query('SELECT * FROM Dato ORDER BY updateDate DESC')
		.on('result', function(data) {
			// Push results onto the notes array
			notes.push(data);
		})
		.on('end', function() {
			// Only emit notes after query has been completed
			socket.emit('initial notes', notes)
		});
}

/*
Insertar una nota en la base de datos
return true si la operacion fue exitosa
*/
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
}

/*
 * Escuchador
 * Listen 3000
 * */
http.listen(3000, function() {
	console.log('listening on *:3000');
});
