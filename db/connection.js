module.exports = knex = require('knex')({
	client: 'mysql',
	connection: {
		host: '127.0.0.1',
		user: 'root',
		password: 'root',
		database: 'bd_sensor'
	},
	pool: {
		min: 0,
		max: 10
	}
});
