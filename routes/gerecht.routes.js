var gerechtRoutes = function(gerechtCtrl) {
	var express = require('express');
	var gerechtRouter = express.Router();

	gerechtRouter.route('/api/gerechten')
		.get(function(req,res) {
			return gerechtCtrl.getGerechten(req,res);
		})
		.post(function(req,res) {
			return gerechtCtrl.createGerecht(req,res);
		});

	gerechtRouter.use('/api/gerechten/:id', gerechtCtrl.fetchGerecht);
	gerechtRouter.route('/api/gerechten/:id')
		.get(function(req,res) {
			return gerechtCtrl.getGerecht(req,res);
		})
		.put(function(req,res) {
			return gerechtCtrl.updateGerecht(req,res);
		})
		.patch(function(req,res) {
			return gerechtCtrl.patchGerecht(req,res);
		})
		.delete(function(req,res) {
			return gerechtCtrl.deleteGerecht(req,res);
		});
		

	gerechtRouter.route('/gerechten')
		.get(function(req,res) {
			return gerechtCtrl.renderGerechten(req,res);
		});

	return gerechtRouter;
}

module.exports = gerechtRoutes;

