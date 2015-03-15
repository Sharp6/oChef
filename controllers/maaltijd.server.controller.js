var Maaltijd = require('../models/maaltijd.server.model.js');
var Gerecht = require('../models/gerecht.server.model.js');
var partials = {
	menu: 'menu'
}
var activeMenu = "maaltijd";
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
	var entry = new Maaltijd({
		datum: req.body.datum,
		nota: req.body.nota,
		gerecht: req.body.gerecht
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