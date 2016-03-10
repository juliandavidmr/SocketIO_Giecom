/**
 * Created by julian on 9/03/16.
 */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');

app.use(express.static('bower_components'));

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
    io.sockets.emit('new note', data)
      // Use node's db injection format to filter incoming data
    db.query('INSERT INTO notes (note) VALUES (?)', data.note)
  });

  // Check to see if initial query/notes are set
  if (!isInitNotes) {
    // Initial app start, run db query
    db.query('SELECT * FROM notes')
      .on('result', function(data) {
        // Push results onto the notes array
        notes.push(data)
      })
      .on('end', function() {
        // Only emit notes after query has been completed
        socket.emit('initial notes', notes)
      });

    isInitNotes = true
  } else {
    // Initial notes already exist, send out
    socket.emit('initial notes', notes)
  }
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
