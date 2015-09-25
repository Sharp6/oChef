var Ingredient = require('../models/ingredient.server.model.js');

// API controllers
exports.getIngredienten = function(req,res) {
	var query = Ingredient.find();

	query.exec(function(err,results) {
		res.json(results);
	});
	
};


// Render controllers
exports.renderIngredienten = function(req,res) {
	res.render('container', 
		{
			partials: { body: 'ingredienten' }
		});
};

/*
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
*/

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
		partials: { menu: 'menu' }
	});
};

exports.list = function(req,res) {
	var query = Ingredient.find();

	query.limit(12)
		.exec(function(err,results){
			res.render('ingredientLijst', {
				//partials: partials,
				activeMenuItemChecker: activeMenuItemChecker,
				title: 'Ingredienten - Lijst', 
				ingredienten:results
			});
		});
};


