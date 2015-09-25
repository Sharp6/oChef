define(["knockout", "da/ingredient.da.client", "models/ingredient.model.client"], function(ko, ingredientDA, Ingredient) {

	var vm = function() {
		var self = this;

		self.ingredienten = ko.observableArray();

		self.loadIngredienten = function() {
			ingredientDA.load()
				.then(function(ingredientenData) {
					var mappedIngredienten = ingredientenData.map(function(ingredientData) {
						return new Ingredient(ingredientData);
					});
					self.ingredienten(mappedIngredienten);
				})
		}

		self.init = function() {
			self.loadIngredienten();
		}
	};

	return vm;
});