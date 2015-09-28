var mongoose = require('mongoose');
var Gerecht = require('../models/gerecht.server.model');

exports.updateGerecht = function(req) {
	return new Promise(function(resolve,reject) {
		req.gerecht.save(function(err) {
			if(err) {
				reject(err);
			} else {
				resolve(req.gerecht);
			}
		});
	});
}

exports.deleteGerecht = function(req) {
	return new Promise(function(resolve,reject) {
		req.gerecht.remove(function(err) {
			if(err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}