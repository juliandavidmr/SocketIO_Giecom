const express = require('express');
const router = express.Router();
const db_u = require('../db/db_users');

//console.log(db_dato.area);

const dir = '../www/';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Login
router.get('/login', function(req, res){
	res.render(dir + 'views/login');
});
/*
  GET: Menu de usuario
  user
 */
router.get('/sign_up', function(req, res) {
    //console.log("usuario: " + req.user);
    res.render(dir + 'views/sign_up');
});

/*
  POST: Registro
  list sensor
 */
router.post('/sign_up', function(req, res, next) {
    var new_user = {
	name: req.body.nombre,
	password: req.body.password,
	username: req.body.username,
	admin: 0,
	apellido: req.body.apellido		
    }
    var ne = {};
    var estado = false;
    db_u.insertUsuario(new_user, function(row, est) {
	if (row > 0) {
	    res.redirect('/usuarios/login');
	} else {
	    res.send('No se registro');
	}
    });
});
passport.use(new LocalStrategy(
    function(username, password, done) {
	//console.log("Here");
	db_u.getUserByUsername(username, function(row){
	    //console.log("er1 ", row[0].password);
	    //////////////////////////////////////////////////////////////////////////////console.log("er2 " + est);
	    //if(err) throw err;
	    if(row == 0){
   		return done(null, false, {message: 'Unknown User'});
	    }
	    db_u.comparePassword(password, row[0].password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   		    return done(null, row[0]);
   		} else {
   		    return done(null, false, {message: 'Invalid password'});
   		}
	    });
	});	      
}));

passport.serializeUser(function(user, done) {
    //console.log("www", user);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    db_u.getUserById(id, function(row) {
    done(null, row[0]);
  });
});

router.post('/login',
	    passport.authenticate('local', {successRedirect:'/', failureRedirect:'/usuarios/login',failureFlash: true}),
	    function(req, res) {
		console.log("logon");
		req.flash('success_msg', 'You are In');
		res.redirect('/');
	    });

// router.get('/logout', function(req, res){
// 	req.logout();

// 	req.flash('success_msg', 'You are logged out');

// 	res.redirect('/users/login');
// });
module.exports = router;
