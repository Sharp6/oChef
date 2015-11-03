var express = require('express');
var router = express.Router();
var passport = require('passport');

router.route('/google/callback')
	.get(passport.authenticate('google', {
		successRedirect: '/',
		failure: '/error/'
	}));

// Scope is google-specific
router.route('/google')
	.get(passport.authenticate('google', {
		scope: [ "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email" ] 
	}));

module.exports = router;