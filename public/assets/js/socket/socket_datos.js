$(document).ready(function() {
	// Initial set of notes, loop through and add to list
	socket.on('datos datos', function(data) {
		var html = '';
		for (var i = 0; i < data.datosensores.length; i++) {
			// We store html as a var then add to DOM after for efficiency
			html += jsonToHtml_DatosSensores(data.datosensores[i]);
		}
		cantidad = data.length;
		$('#notes').html(html);
	});

	// Initial set of notes, loop through and add to list
	socket.on('datos datos', function(data) {
		var html = '';
		for (var i = 0; i < data.datosensores.length; i++) {
			// We store html as a var then add to DOM after for efficiency
			html += jsonToHtml_DatosSensores(data.datosensores[i]);
		}
		$('#notes').html(html);

		//var l=['1', '2', '3', '4', '5', '6'];
		var l = [];
		var serie = [];
		var sensores = [];
		for (var j = 0; j < data.tiposensores.length; j++) {
			for (var i = 0; i < data.datosensores.length; i++) {
				if (data.datosensores[i].fk_idSensor == data.tiposensores[j].idSensor) {
					if (j == 0) {
						l.push(moment(data.datosensores[i].insertDate).format('LTS'));
					}
					serie.push(data.datosensores[i].Dato);
				}
			}
			sensores.push(serie);
			serie = [];
		}
    
		console.log("Labels: " + l.length);
		console.log("sereis: " + sensores.length);

		new Chartist.Line('#chart1', {
			labels: l,
			series: sensores
		});
	});

	socket.on('users connected', function(data) {
		$('#usersConnected').html('Online: ' + data);
	});
})
