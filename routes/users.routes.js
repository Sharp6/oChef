var userRoutes = function(mainCtrl) {
	var express = require('express');
	var userRouter = express.Router();

	userRouter.use('/', function(req,res,next) {
		if(!req.user) {
			res.redirect('/login');
		}
		next();
	});

	userRouter.route('/')
		.get(mainCtrl.renderUsers);

	return userRouter;
}


module.exports = userRoutes;