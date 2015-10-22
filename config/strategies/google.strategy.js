var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;	

module.exports = function(User) {
	passport.use(new GoogleStrategy({
  clientID: '864481022770-9trivngg51atkd3e25gv4igdiliuqrpt.apps.googleusercontent.com',
  clientSecret: 'EagiMsEnuMDTiDc3Q7Z5ulA4',
  callbackURL: process.env.SERVERBASE + '/auth/google/callback'},
  function(req, accessToken, refreshToken, profile, done){
    var query = {
      'google.id' : profile.id
    }

    User.findOne(query, function(error, user) {
      if(user) {
        done(null, user);
      } else {
        var user = new User;
        user.email = profile.emails[0].value;
        user.image = profile._json.image.url;
        user.displayName = profile.displayName;
        user.role = 'user';

        user.google = {};
        user.google.id = profile.id;
        user.google.token = accessToken;

        user.save();
        done(null, user);
      }
    });
  }
	));
}
