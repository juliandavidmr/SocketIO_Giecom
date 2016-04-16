  /*
		Convierte un json con el dato de un sensor a codigo html
		*/
	function jsonToHtml_DatosSensores(data) {
		var html = '<tr title="' + data.Descripcion + '">' + '<td>' + data.Dato + '</td><td> ' + data.NombreSensor + '</td><td>' + moment(data.insertDate).fromNow() + '</td></tr>';
		return html;
	}

	/*
	Convierte un json de un sensor a codigo html
	*/
	function jsonToHtml_Sensores(data) {
		var html = '<div class="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6">' +
			'<div class="font-icon-detail">' +
			'<i class="pe-7s-edit"></i>' +
			'<input type="button" value="' + data.NombreSensor + '" onclick="">' +
			'</div>' + '</div>';
		return html;
	}
