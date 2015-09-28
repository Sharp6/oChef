var mongoose = require('mongoose');
var Maaltijd = require('../models/maaltijd.server.model');

exports.updateMaaltijd = function(req) {
	return new Promise(function(resolve,reject) {
		req.maaltijd.save(function(err) {
			if(err) {
				reject(err);
			} else {
				resolve(req.maaltijd);
			}
		});
	});
}

exports.deleteMaaltijd = function(req) {
	return new Promise(function(resolve,reject) {
		req.maaltijd.remove(function(err) {
			if(err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}