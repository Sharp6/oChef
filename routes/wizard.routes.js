var wizardRoutes = function(mainCtrl) {
	var express = require('express');
	var wizardRouter = express.Router();

	wizardRouter.use('/', function(req,res,next) {
		if(!req.user) {
			res.redirect('/login');
		}
		next();
	});

	wizardRouter.route('/')
		.get(mainCtrl.renderWizard);

	return wizardRouter;
}


module.exports = wizardRoutes;