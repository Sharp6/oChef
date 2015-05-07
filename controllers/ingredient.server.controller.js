var Ingredient = require('../models/ingredient.server.model.js');
var partials = {
	menu: 'menu'
};
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
		nota: req.body.nota,
		maandenInSeizoen: req.body.maandenInSeizoen
	});
	entry.save();

	res.json("hello");
};

exports.newIngredient = function(req,res) {
	res.render('newIngredient', { 
		partials: partials,
		title: 'oChef - nieuw ingredient', 
		activeMenuItemChecker: activeMenuItemChecker
	});
};

exports.list = function(req,res) {
	var query = Ingredient.find();

	query.limit(12)
		.exec(function(err,results){
			res.render('ingredientLijst', {
				partials: partials,
				activeMenuItemChecker: activeMenuItemChecker,
				title: 'Ingredienten - Lijst', 
				ingredienten:results
			});
		});
};

exports.getIngredienten = function(req,res) {
	var query = Ingredient.find();

	query.exec(function(err,results) {
		res.json(results);
	});
	
};

exports.renderIngredienten = function(req,res) {
	res.render('ingredienten',
	{ 
		partials: partials,
		title: 'oChef - Ingredienten', 
		activeMenuItemChecker: activeMenuItemChecker
	});	
};