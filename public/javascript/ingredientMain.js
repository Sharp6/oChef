require.config({
	shim : {
		"hotkeys" : { "deps" : ['jquery']},
		"bootstrap" : { "deps" :['jquery'] },
		"typeahead" : { "deps" : ['bootstrap']},
		"binding-typeahead" : { "deps": ['bootstrap']}
	},
	paths: {
		jquery: '/libraries/jquery-2.1.3.min',
		knockout: '/libraries/knockout-3.3.0',
		bootstrap: '/libraries/bootstrap.min',
		moment: '/libraries/moment-with-locales.min'
	}
});

require(["jquery", "bootstrap", "knockout", "viewmodels/ingredienten.vm.client"], function($, bootstrap, ko, IngredientVM) {
	var iVM = new IngredientVM();
	iVM.init();
	ko.applyBindings(iVM);
});