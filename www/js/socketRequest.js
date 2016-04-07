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
			html += jsonToHtml_DatosSensores(data[i]);
		}
    cantidad = data.length;
		$('#notes').html(html);
	});

	// Initial set of notes, loop through and add to list
	socket.on('initial notes', function(data) {
		var html = '';
		for (var i = 0; i < data.length; i++) {
			// We store html as a var then add to DOM after for efficiency
			html += jsonToHtml_DatosSensores(data[i]);
		}
		cantidad = data.length;
		$('#notes').html(html);
	});

	// Initial set of sensores
	socket.on('sensores', function(data) {
		var html = '';
		for (var i = 0; i < data.length; i++) {
			// We store html as a var then add to DOM after for efficiency
			html += jsonToHtml_Sensores(data[i]);
		}
		console.log(html);
		$('#sensores').html(html);
	});

  socket.on('new note', function(data) {
		//prepend apila el dato en la parte de arriba
		  $('#notes').prepend(jsonToHtml_DatosSensores(data));
  });

	socket.on('users connected', function(data) {
		$('#usersConnected').html('Online: ' + data);
	});

	$('#addData_Btn').click(function() {
		console.log(">>: " + $('#textData_Input').val());
		socket.emit('new note', {
			dato: $('#textData_Input').val()
		});
	});

	/*
	Convierte un json con el dato de un sensor a codigo html
	*/
	function jsonToHtml_DatosSensores(data) {
		var html = '<tr title="'+ data.Descripcion + '">'
						+'<td>'+ data.Dato
						+ '</td><td> '+ data.NombreSensor
						+ '</td><td>'+ moment(data.insertDatetime).fromNow()
						+ '</td></tr>';
		return html;
	}

	/*
	Convierte un json de un sensor a codigo html
	*/
	function jsonToHtml_Sensores(data) {
		var html = '<div class="col-md-2">' +
									'<button class="btn btn-default btn-block" onclick="demo.showNotification(top,right)">'+ data.NombreSensor +
									'</button>'+
								'</div>';
		return html;
	}

})
