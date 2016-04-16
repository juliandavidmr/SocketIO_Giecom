const knex = require('./connection');
const bcrypt = require('bcryptjs');

export class Usuario {

	constructor() {
	}

	getUsers(callback) {
		knex
			.select('*')
			.from('User')
			.limit(30)
			.orderBy('name', 'desc')
			.then(function(rows) {
				callback(rows);
			})
			.catch(function(error) {
				console.error("ERROR " + error)
			});
	}

	insertUsuario(new_user, callback) {
		console.log("Hast aqui" + new_user.password);
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(new_user.password, salt, function(err, hash) {
				new_user.password = hash;
				knex('User')
					.insert(new_user)
					.returning('*')
					.then(function(row) {
						console.log("El row: " + row);
						callback(row);
					})
					.catch(function(error) {
						console.error("ERROR " + error)
					});
			});
		});
	}

	getUserByUsername(username, callback) {
		//var query = {username: username};
		//User.findOne(query, callback);
		//console.log("user " + username);
		knex('User').where('username', username)
			.select('password', 'username', 'admin', 'id')
			.limit(1)
			.then(function(row) {
				//console.log("fine", row);
				callback(row);
			})
			.catch(function(error) {
				console.error("ERROR --" + error)
			});
	}

	getUserById(userId, callback) {
		//var query = {username: username};
		//User.findOne(query, callback);
		//console.log("user " + username);
		knex('User').where('id', userId)
			.select('password', 'username', 'admin', 'id')
			.limit(1)
			.then(function(row) {
				//console.log("fine", row);
				callback(row);
			})
			.catch(function(error) {
				console.error("ERROR --" + error)
			});
	}

	comparePassword(candidatePassword, hash, callback) {
		bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
			if (err) throw err;
			callback(null, isMatch);
		});
	}
}
