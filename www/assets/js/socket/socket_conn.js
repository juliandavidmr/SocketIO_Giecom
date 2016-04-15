$(document).ready(function() {
	// Connect to our node/websockets server
	var ip = 'http://localhost:';
	var port = 3000;
	socket = io.connect(ip + port);
});
