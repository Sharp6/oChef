require.config({
	paths: {
		jquery: '/libraries/jquery-2.1.3.min',
		knockout: '/libraries/knockout-3.3.0'
	}
});

require(["jquery", "knockout", "viewmodels/ingredienten.vm.client"], function($, ko, IngredientVM) {
	var iVM = new IngredientVM();
	iVM.init();
	ko.applyBindings(iVM);
});