$(document).ready(function() {

		console.log('jola: ' + <%= sensor.length %>);

		var serie = [];
		var sensores = [];
		var cont=0;
			for (var i = 0; i < sensor.length; i++) {
					serie.push(sensor[i].NombreSensor);
					var fecha = moment(sensor[i].insertDate).format('LTS');
					l.push(fecha.substr(0,fecha.length-3).toString());
					serie.push(sensor[i].Dato);

			}

			sensores.push(serie);
			serie = [];

		}

var chart = c3.generate({
    bindto: '#chartone',
    data: {

      columns: sensores,
        type: 'area-spline'
    },
		axis: {
        x: {
                //type: 'timeseries',
                //tick: {format: function (x) { return x.getHours()+":"+x.getMinutes()+":"+x.getSeconds(); }},
								type: 'category',
                categories: l,
								label: {
				          text: 'Hora',
				          position: 'outer-middle'
				        }
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

/*chart.on('created', function() {
  if(window.__anim0987432598723) {
    clearTimeout(window.__anim0987432598723);
    window.__anim0987432598723 = null;
  }
  window.__anim0987432598723 = setTimeout(chart.update.bind(chart), 8000);
});*/



	socket.on('users connected', function(data) {
		$('#usersConnected').html('Online: ' + data);
	});
})
