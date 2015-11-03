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
		

	gerechtRouter.route('/api/gerechten/:id/img')
		.get(function(req,res) {
			return gerechtCtrl.downloadImg(req,res);
		})
		.post(function(req,res) {
			return gerechtCtrl.uploadImage(req,res);
		});

	gerechtRouter.route('/api/gerechtenTags')
		.get(function(req,res) {
			return gerechtCtrl.getTags(req,res):
		});

	gerechtRouter.use('/gerechten', function(req,res,next) {
		if(!req.user) {
			res.redirect('/login');
		}
		next();
	});

	gerechtRouter.route('/gerechten')
		.get(function(req,res) {
			return gerechtCtrl.renderGerechten(req,res);
		});

	return gerechtRouter;
}

module.exports = gerechtRoutes;

