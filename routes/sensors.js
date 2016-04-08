/* ____________________________________________________________________________
                          RUTAS
   ____________________________________________________________________________
*/

var express = require('express');
var router = express.Router();
var select = require('../db/select');

var dir = '../www/';

/*
  GET: Listado de sensores
  list sensor
 */
router.get('/', function(req, res) {
	select.getSensores(function(rows) {
		console.log(rows);
    /*
    [ { idSensor: 1,
    NombreSensor: 'Sensor de nivel',
    Referencia: 'DDFC',
    Descripcion: 'Sensor de nivel por luz',
    insertDate: Thu Apr 07 2016 17:39:31 GMT-0500 (COT),
    updateDate: Thu Apr 07 2016 17:39:31 GMT-0500 (COT),
    fk_idTipoSensor: 1,
    Maximo: 300,
    Minimo: -20,
    Altura: 200 }
    ]
    */
		res.render(dir + 'views/sensors/list', {
			sensores: rows
		});
	});
});

module.exports = router;
