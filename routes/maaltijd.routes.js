var express = require('express');
var maaltijdRouter = express.Router();

var maaltijdCtrl = require('../controllers/maaltijd.controller.server');

maaltijdRouter.route('/api/maaltijden')
	.get(function(req,res) {
		return maaltijdCtrl.getMaaltijden(req,res);
	})
	.post(function(req,res) {
		return maaltijdCtrl.createMaaltijd(req,res);
	});

maaltijdRouter.use('/api/maaltijden/:id', maaltijdCtrl.fetchMaaltijd);
maaltijdRouter.route('/api/maaltijden/:id')
	.get(function(req,res) {
		return maaltijdCtrl.getMaaltijd(req,res);
	})
	.put(function(req,res) {
		return maaltijdCtrl.updateMaaltijd(req,res);
	})
	.patch(function(req,res) {
		return maaltijdCtrl.patchMaaltijd(req,res);
	})
	.delete(function(req,res) {
		return maaltijdCtrl.deleteMaaltijd(req,res);
	});
	

maaltijdRouter.route('/maaltijden')
	.get(function(req,res) {
		return maaltijdCtrl.renderMaaltijden(req,res);
	});

module.exports = maaltijdRouter;
