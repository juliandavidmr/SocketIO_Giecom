/**
 * Created by julian on 12/03/16.
 */
$(document).ready(function() {
    // Connect to our node/websockets server
    var ip = 'http://localhost:';
    var port = 3000;
    var socket = io.connect(ip + port);

    // Initial set of notes, loop through and add to list
    socket.on('initial notes', function(data) {
        var html = '';
        for (var i = 0; i < data.length; i++) {
            // We store html as a var then add to DOM after for efficiency
            html += '<li class=list-group-item >' + data[i].note + '</li>'
        }
        $('#notes').html(html)
    });

    // New note emitted, add it to our list of current notes
    socket.on('new note', function(data) {
        console.log("La nota: " + JSON.stringify(data));
        $('#notes').append('<li class=list-group-item>' + data.note + '</li>');
    });

    // New socket connected, display new count on page
    socket.on('users connected', function(data) {
        $('#usersConnected').html('Users connected: ' + data);
    });

    socket.on('users connected', function(data) {
        $('#usersConnected').html('Online: ' + data);
    });

    // Add a new (random) note, emit to server to let others know
    $('#addData_Btn').click(function() {
        console.log(">>: " + $('#textData_Input').val());
        socket.emit('new note', {note: $('#textData_Input').val()});
    });
})