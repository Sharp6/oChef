require.config({
	shim : {
		"hotkeys" : { "deps" : ['jquery'] },
		"bootstrap" : { "deps" :['jquery']  },
		"typeahead" : { "deps" : ['bootstrap'] },
		"binding-typeahead" : { "deps": ['bootstrap'] },
		"knockoutFileBindings" : { "deps": ['knockout', 'jquery'] },
		"koStarRating" : { "deps" : ['knockout', 'jquery']},
		"masonry" : { "deps" : ['jquery']},
		"imagesloaded" : { "deps": ['jquery']},
		"bindingMasonry" : { "deps" : ['masonry'] }
	},
	paths: {
		jquery: '/libraries/jquery-2.1.3.min',
		knockout: '/libraries/knockout-3.3.0',
		knockoutFileBindings: '/libraries/knockout-file-bindings',
		bootstrap: '/libraries/bootstrap.min',
		moment: '/libraries/moment-with-locales.min',
		koStarRating: '/libraries/ko-starRating',
		masonry: '/libraries/masonry.pkgd.min',
		imagesloaded: '/libraries/imagesloaded.pkgd',
		bindingMasonry: '/libraries/ko-binding-masonry'
	}
});

require(["jquery", "bootstrap", "knockout", "knockoutFileBindings", "koStarRating", "bindingMasonry", "masonry", "imagesloaded", "viewmodels/wizard.vm.client", "viewmodels/user.vm.client"], 
	function($, bootstrap, ko, koFileBindings, koStarRating, bindingMasonry, Masonry, imagesLoaded, WizardVM, UserVM) {
	
	var uVM = new UserVM();
	uVM.init();
	var wVM = new WizardVM();
	wVM.init();

	uVM.user.subscribe(function(newValue) {
		wVM.user(newValue);
	});
	
	ko.applyBindings(wVM, document.getElementById('mainContent'));
	ko.applyBindings(uVM, document.getElementById('userInfo'));
});
