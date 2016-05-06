$(document).ready(function() {


  socket.on('datos datos', function(data) {
    var map_options = {
    		center: new google.maps.LatLng(1.619829,-75.605942),
    		zoom: 16,
    		mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var google_map = new google.maps.Map(document.getElementById("map"), map_options);
    var info_window = new google.maps.InfoWindow({
    		content: 'loading'
    });

    var t = [];
    var x = [];
    var y = [];

    for (var j = 0; j < data.tiposensores.length; j++) {
    	t.push(data.tiposensores[j].NombreSensor);
    	x.push(data.tiposensores[j].Latitud);
    	y.push(data.tiposensores[j].Longitud);
    }

    var i = 0;
    for ( item in t ) {
    		var m = new google.maps.Marker({
    				map:       google_map,
    				animation: google.maps.Animation.DROP,
    				title:     t[i],
    				position:  new google.maps.LatLng(x[i],y[i])
    		});

    		google.maps.event.addListener(m, 'click', function() {
    				info_window.setContent(this.html);
    				info_window.open(map, this);
    		});
    		i++;
    }


  });
});
