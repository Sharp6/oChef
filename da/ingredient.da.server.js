var mongoose = require('mongoose');
var Ingredient = require('../models/ingredient.server.model');

exports.updateIngredient = function(req) {
	return new Promise(function(resolve,reject) {
		req.ingredient.save(function(err) {
			if(err) {
				reject(err);
			} else {
				resolve(req.ingredient);
			}
		});
	});
}

exports.deleteIngredient = function(req) {
	return new Promise(function(resolve,reject) {
		req.ingredient.remove(function(err) {
			if(err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}