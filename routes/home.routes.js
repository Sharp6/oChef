var mainRoutes = function(mainCtrl) {
	var express = require('express');
	var mainRouter = express.Router();

	mainRouter.route('/')
		.get(mainCtrl.renderHome);

	mainRouter.route('/login')
		.get(mainCtrl.renderLogin);

	mainRouter.route('/logout')
		.get(function(req,res) {
			req.logout();
			res.redirect('/');
		});

	return mainRouter;
}

module.exports = mainRoutes;