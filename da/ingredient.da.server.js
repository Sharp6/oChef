var ingredientDA = function(Ingredient) {

	var updateIngredient = function(req) {
		console.log(req.ingredient);
		console.log(req.ingredient.tags);
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

	var deleteIngredient = function(req) {
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

	return {
		updateIngredient: updateIngredient,
		deleteIngredient: deleteIngredient
	}	
}

module.exports = ingredientDA;
