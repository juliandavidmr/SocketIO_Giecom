//module.exports = {
//    'secret': 'ilovescotchyscotch'
//};
// passport.use('local-signup', new LocalStrategy({
//     // by default, local strategy uses username and password, we will override with email
//     usernameField : 'name',
//     passwordField : 'password',
//     passReqToCallback : true // allows us to pass back the entire request to the callback
// },
// function(req, username, password, done) {

//     // find a user whose email is the same as the forms email
//     // we are checking to see if the user trying to login already exists
//     connection.query("select * from users where email = '"+email+"'",function(err,rows){
// 			console.log(rows);
// 			console.log("above row object");
// 			if (err)
//                 return done(err);
// 			 if (rows.length) {
//                 return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
//             } else {

// 				// if there is no user with that email
//                 // create the user
//                 var newUserMysql = new Object();
				
// 				newUserMysql.email    = email;
//                 newUserMysql.password = password; // use the generateHash function in our user model
			
// 				var insertQuery = "INSERT INTO users ( email, password ) values ('" + email +"','"+ password +"')";
// 					console.log(insertQuery);
// 				connection.query(insertQuery,function(err,rows){
// 				newUserMysql.id = rows.insertId;
				
// 				return done(null, newUserMysql);
// 				});	
//             }	
// 		});
//     }));
