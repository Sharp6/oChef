var ingredientController = function(Ingredient, ingredientDA) {
	// Middleware controllers
	var fetchIngredient = function(req,res,next) {
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
	var getIngredient = function(req,res) {
		res.json(req.ingredient);
	}

	var getIngredienten = function(req,res) {
		var query = Ingredient.find(req.query).sort('naam');
		query.exec(function(err,results) {
			res.json(results);
		});
	};

	var getTags = function(req,res) {
		Ingredient.distinct('tags', function(error, tags) {
			res.json(tags);
		});
	}

	var createIngredient = function(req,res) {
		var ingredient = new Ingredient();
		ingredient.save();
		res.status(201).send(ingredient);
	}

	var updateIngredient = function(req,res) {
		var ingredientData = JSON.parse(req.body.ingredient);

		console.log("In controller", ingredientData.tags);

		req.ingredient.naam = ingredientData.naam;
		req.ingredient.nota = ingredientData.nota;
		req.ingredient.beschrijving = ingredientData.beschrijving;
		req.ingredient.maandenInSeizoen = ingredientData.maandenInSeizoen;
		req.ingredient.tags = ingredientData.tags;

		ingredientDA.updateIngredient(req)
			.then(function(updatedIngredient) {
				res.json(updatedIngredient);
			})
			.catch(function(err) {
				res.status(500).send(err);
			});
	}

	var patchIngredient = function(req,res) {
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

	var deleteIngredient = function(req,res) {
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
	var renderIngredienten = function(req,res) {
		res.render('container', 
			{
				partials: { body: 'ingredienten' }
			});
	};

	return {
		// Middleware
		fetchIngredient: fetchIngredient,
		// API
		getIngredient: getIngredient,
		getIngredienten: getIngredienten,
		createIngredient: createIngredient,
		updateIngredient: updateIngredient,
		patchIngredient: patchIngredient,
		deleteIngredient: deleteIngredient,
		getTags: getTags,
		// Render
		renderIngredienten: renderIngredienten
	}
}

module.exports = ingredientController;

