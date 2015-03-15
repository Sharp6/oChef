var Gerecht = require('../models/gerecht.server.model.js');
var partials = {
	menu: 'menu'
}
var activeMenu = "gerecht";
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
	var entry = new Gerecht({
		naam: req.body.gerechtNaam,
		nota: req.body.nota,
		beschrijving: req.body.beschrijving
	});
	entry.save();

	res.redirect(301, '/');
};

exports.newGerecht = function(req,res) {
	res.render('newGerecht', { 
		partials: partials,
		activeMenuItemChecker: activeMenuItemChecker,
		title: 'oChef - nieuw gerecht'
	});
};

exports.getGerechten = function(req,res) {
	var query = Gerecht.find();

	query.exec(function(err,results) {
		res.json(results);
	});
	
};