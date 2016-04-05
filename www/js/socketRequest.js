/**
 * Created by julian on 12/03/16.
 */
$(document).ready(function() {
	// Connect to our node/websockets server
	var ip = 'http://localhost:';
	var port = 3000;
	var socket = io.connect(ip + port);
  var cantidad = 0;

	// Initial set of notes, loop through and add to list
	socket.on('initial notes', function(data) {
		var html = '';
		for (var i = 0; i < data.length; i++) {
			// We store html as a var then add to DOM after for efficiency
			//html += '<li class=list-group-item >' + data[i].note + '</li>'
			html += '<tr><td> '+(i+1)+' </td> <td> '+data[i].note+' </td> </tr>';
		}
    cantidad = data.length;
		$('#notes').html(html)
	});

  socket.on('new note', function(data) {
    $('#notes').append('<tr><td> '+(cantidad++)+' </td> <td> '+data.note+' </td> </tr>');
  });

	socket.on('users connected', function(data) {
		$('#usersConnected').html('Online: ' + data);
	});

	$('#addData_Btn').click(function() {
		console.log(">>: " + $('#textData_Input').val());
		socket.emit('new note', {
			note: $('#textData_Input').val()
		});
	});
})
