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
		var cont=0;
		for (var j = 0; j < data.tiposensores.length; j++) {
			for (var i = 0; i < data.datosensores.length; i++) {
						console.log("Datos: " + data.datosensores[i].insertDate);
				if(i==0){
						l[0]="x";
					serie.push(data.tiposensores[j].NombreSensor);
				}
				if (data.datosensores[i].fk_idSensor == data.tiposensores[j].idSensor) {
					if (j == 0) {
						//var fecha = moment(data.datosensores[i].insertDate).format().substr(0,10) +" "+ moment(data.datosensores[i].insertDate).format().substr(11,8);
						var fecha = moment(data.datosensores[i].insertDate).format('L LTS');
						l.push(fecha.toString());
					}

					serie.push(data.datosensores[i].Dato);
				}
				if(cont==0){
				sensores.push(l);
				cont++;
			}
			}

			sensores.push(serie);
			serie = [];

		}

		new Chartist.Line('#chart1', {
			labels: l,
			series: sensores
		});
		console.log("Sne: " + sensores);


var chart = c3.generate({
    bindto: '#chart',
    data: {
			x: 'x',
			xFormat: '%d/%m/%Y %H:%M:%S',
      columns: sensores,
        type: 'area-spline'
    },
		axis: {
        x: {
                type: 'timeseries',
                tick: {format: function (x) { return x.getHours()+":"+x.getMinutes()+":"+x.getSeconds(); }}
            }
        ,
      y: {
        label: {
          text: 'Dato',
          position: 'outer-middle'
        }
      }
		}
});
require.config({
  baseUrl: '/js',
  paths: {
    d3: "http://d3js.org/d3.v3.min"
  }
});


chart.on('created', function() {
  if(window.__anim0987432598723) {
    clearTimeout(window.__anim0987432598723);
    window.__anim0987432598723 = null;
  }
  window.__anim0987432598723 = setTimeout(chart.update.bind(chart), 8000);
});

	});


	socket.on('users connected', function(data) {
		$('#usersConnected').html('Online: ' + data);
	});
})
