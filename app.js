/**
 * Created by julian on 9/03/16.
 */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var expressLayouts = require('express-ejs-layouts')

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
  database: 'mysql_giecom'
});

// Log any errors connected to the db
db.connect(function(err) {
  if (err) {
    console.log(err)
  } else {
    console.log("Base de datos conectada.");
  }
});



/* ____________________________________________________________________________
                          RUTAS
   ____________________________________________________________________________
*/

app.get('/', function(req, res) {
  //res.sendFile(__dirname + '/www/views/index.html');
  //res.render(__dirname + '/www/dashboard',{ layout: 'layout' });
  res.render(__dirname + '/www/views/dashboard');
});

app.get('/user', function(req, res) {
  res.render(__dirname + '/www/views/user');
});

app.get('/table', function(req, res) {
  res.render(__dirname + '/www/views/table');
});

app.get('/typography', function(req, res) {
  res.render(__dirname + '/www/views/typography');
});

app.get('/icons', function(req, res) {
  res.render(__dirname + '/www/views/icons');
});

app.get('/maps', function(req, res) {
  res.render(__dirname + '/www/views/maps');
});

app.get('/template', function(req, res) {
  res.render(__dirname + '/www/views/template');
});

app.get('/notifications', function(req, res) {
  res.render(__dirname + '/www/views/notifications');
});

// Define/initialize our global vars
var notes = [];
var isInitNotes = false;
var socketCount = 0;

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

  consultarNotas(socket);
});

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });
});

app.post('/add/:item', function(req, res) {
  var data = req.params['item'];
  data = {
    note: data
  };
  io.emit('new note', data);
  insertNote(data);
  res.json(data);
});

function consultarNotas(socket){
    notes = [];
    db.query('SELECT * FROM notes')
        .on('result', function(data) {
          // Push results onto the notes array
          notes.push(data)
        })
        .on('end', function() {
          // Only emit notes after query has been completed
          socket.emit('initial notes', notes)
        });
}

function insertNote(data){
  try {
    db.query('INSERT INTO notes (note) VALUES (?)', data.note);
  }catch(err) {
    console.log("Error al insertar Data en la database. " + err);
  }
}

/*
* Listen 3000
* */

http.listen(3000, function() {
  console.log('listening on *:3000');
});
