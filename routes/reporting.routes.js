var reportingRoutes = function(reportingCtrl) {
	var express = require('express');
	var reportingRouter = express.Router();

	reportingRouter.route('/orphanMaaltijden')
		.get(function(req,res) {
			return reportingCtrl.getOrphanMaaltijden(req,res);
		});

	return reportingRouter;
};

module.exports = reportingRoutes;