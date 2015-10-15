var passport = require('passport');

module.exports = function(app, User) {
	app.use(passport.initialize());
	app.use(passport.session());
	passport.serializeUser(function(user, done) {  // Places a user in the session
	  done(null,user);
	}); 
	passport.deserializeUser(function(user, done) {
	  done(null,user);
	});

	require('./strategies/google.strategy')(User);
}