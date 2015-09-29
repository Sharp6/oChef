var mongoose = require('mongoose');
var Maaltijd = require('../models/maaltijd.server.model');

exports.updateMaaltijd = function(req) {
	console.log("Got here");
	console.log(req.maaltijd.datum);
	console.log(req.maaltijd);
	return new Promise(function(resolve,reject) {
		console.log("here");
		req.maaltijd.save(function(err) {
			if(err) {
				console.log("err" + err);
				reject(err);
			} else {
				console.log("Got here");
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
