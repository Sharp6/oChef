var ingredientRoutes = function(ingredientCtrl) {
	var express = require('express');
	var ingredientRouter = express.Router();

	ingredientRouter.route('/api/ingredienten')
		.get(function(req,res) {
			return ingredientCtrl.getIngredienten(req,res);
		})
		.post(function(req,res) {
			return ingredientCtrl.createIngredient(req,res);
		});

	ingredientRouter.use('/api/ingredienten/:id', ingredientCtrl.fetchIngredient);
	ingredientRouter.route('/api/ingredienten/:id')
		.get(function(req,res) {
			return ingredientCtrl.getIngredient(req,res);
		})
		.put(function(req,res) {
			return ingredientCtrl.updateIngredient(req,res);
		})
		.patch(function(req,res) {
			return ingredientCtrl.patchIngredient(req,res);
		})
		.delete(function(req,res) {
			return ingredientCtrl.deleteIngredient(req,res);
		});

	ingredientRouter.route('/api/ingredientenTags')
		.get(function(req,res) {
			return ingredientCtrl.getTags(req,res);
		});
		

	ingredientRouter.route('/ingredienten')
		.get(function(req,res) {
			return ingredientCtrl.renderIngredienten(req,res);
		});

	return ingredientRouter;
}


module.exports = ingredientRoutes;
