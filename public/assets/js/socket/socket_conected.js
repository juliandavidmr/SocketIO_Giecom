$(document).ready(function() {
	socket.on('users connected', function(data) {
		$('#usersConnected').html('Online: ' + data);
	});
})
