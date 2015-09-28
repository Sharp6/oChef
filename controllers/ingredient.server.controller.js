var Ingredient = require('../models/ingredient.server.model.js');
var ingredientDA = require('../da/ingredient.da.server.js');

// Middleware controllers
exports.fetchIngredient = function(req,res,next) {
	Ingredient.findById(req.params.id, function(err,ingredient) {
		if(err) {
			res.status(500).send(err);
		} else if (ingredient) {
			req.ingredient = ingredient
			next();
		} else {
			res.status(404).send('Ingredient not found.');
		}
	});
}

// API controllers
exports.getIngredient = function(req,res) {
	res.json(req.ingredient);
}

exports.getIngredienten = function(req,res) {
	var query = Ingredient.find(req.query);

	query.exec(function(err,results) {
		res.json(results);
	});
};

exports.createIngredient = function(req,res) {
	var ingredient = new Ingredient();
	ingredient.save();
	res.status(201).send(ingredient);
}

exports.updateIngredient = function(req,res) {
	var ingredientData = JSON.parse(req.body.ingredient);

	req.ingredient.naam = ingredientData.naam;
	req.ingredient.nota = ingredientData.nota;
	req.ingredient.beschrijving = ingredientData.beschrijving;
	req.ingredient.maandenInSeizoen = ingredientData.maandenInSeizoen;

	ingredientDA.updateIngredient(req)
		.then(function(updatedIngredient) {
			res.json(updatedIngredient);
		})
		.catch(function(err) {
			res.status(500).send(err);
		});
}

exports.patchIngredient = function(req,res) {
	var ingredientData = JSON.parse(req.body.ingredient);

	for(var field in ingredient) {
		if(field !== "_id") {
			req.ingredient[field] = req.body[field];
		}
	}

	ingredientDA.updateIngredient(req)
		.then(function(updatedIngredient) {
			res.json(updatedIngredient);
		})
		.catch(function(err) {
			res.status(500).send(err);
		});

}

exports.deleteIngredient = function(req,res) {
	var ingredientData = JSON.parse(req.body.ingredient);
	ingredientDA.deleteIngredient(req)
		.then(function() {
			res.status(204).send('Removed');
		})
		.catch(function(err) {
			console.log("err:" + err);
			res.status(500).send(err);
		});
}

// Render controllers
exports.renderIngredienten = function(req,res) {
	res.render('container', 
		{
			partials: { body: 'ingredienten' }
		});
};

