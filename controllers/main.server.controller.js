var Gerecht = require('../models/gerecht.server.model.js');
var activeMenuItemChecker = function() {
	return function(text,render) {
		if(text===activeMenu) {
			return "class='active'";
		} else {
			return "";
		}
	};
};
var partials = {
	menu: 'menu'
}

exports.list = function(req,res) {
	var query = Gerecht.find();

	query.limit(12)
		.exec(function(err,results){

			res.render('index', {
				partials: partials,
				title: 'Gerechten - Lijst', 
				gerechten: results
			});
		});
};