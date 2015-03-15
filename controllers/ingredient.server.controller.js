var Ingredient = require('../models/ingredient.server.model.js');
var partials = {
	menu: 'menu'
}
var activeMenu = "ingredient";
var activeMenuItemChecker = function() {
	return function(text,render) {
		if(text===activeMenu) {
			return "class='active'";
		} else {
			return "";
		}
	};
};

exports.create = function(req,res) {
	var entry = new Ingredient({
		naam: req.body.naam,
		beschrijving: req.body.beschrijving,
		nota: req.body.nota
	});
	entry.save();

	res.redirect(301, '/');
};

exports.newMaaltijd = function(req,res) {
	var query = Gerecht.find();
	query.exec(function(err,results){
		res.render('newMaaltijd', { 
			partials: partials,
			title: 'oChef - nieuwe maaltijd', 
			activeMenuItemChecker: activeMenuItemChecker,
			gerechten: results
		});
	});
};

exports.list = function(req,res) {
	var query = Maaltijd.find();

	query.limit(12)
		.exec(function(err,results){
			res.render('maaltijdLijst', {
				partials: partials,
				activeMenuItemChecker: activeMenuItemChecker,
				title: 'Maaltijden - Lijst', 
				maaltijden:results
			});
		})
};