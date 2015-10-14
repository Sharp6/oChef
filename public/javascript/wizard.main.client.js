require.config({
	shim : {
		"hotkeys" : { "deps" : ['jquery'] },
		"bootstrap" : { "deps" :['jquery']  },
		"typeahead" : { "deps" : ['bootstrap'] },
		"binding-typeahead" : { "deps": ['bootstrap'] },
		"knockoutFileBindings" : { "deps": ['knockout', 'jquery'] },
		"koStarRating" : { "deps" : ['knockout', 'jquery']},
		"masonry" : { "deps" : ['jquery']},
		"imagesloaded" : { "deps": ['jquery']}
	},
	paths: {
		jquery: '/libraries/jquery-2.1.3.min',
		knockout: '/libraries/knockout-3.3.0',
		knockoutFileBindings: '/libraries/knockout-file-bindings',
		bootstrap: '/libraries/bootstrap.min',
		moment: '/libraries/moment-with-locales.min',
		koStarRating: '/libraries/ko-starRating',
		masonry: '/libraries/masonry.pkgd.min',
		imagesloaded: '/libraries/imagesloaded.pkgd'
	}
});

require(["jquery", "bootstrap", "knockout", "knockoutFileBindings", "koStarRating", "masonry", "imagesloaded", "viewmodels/wizard.vm.client"], 
	function($, bootstrap, ko, koFileBindings, koStarRating, Masonry, imagesLoaded, WizardVM) {
	var wVM = new WizardVM();
	wVM.init();
	ko.applyBindings(wVM);

	var imgLoad;
	var msnry;
	var masonryElement = "div.cards-container";
	wVM.gerechten.subscribe(function(newGerechten) {
		imgLoad = imagesLoaded(document.querySelector(masonryElement));
		imgLoad.on('always', function() {
			msnry = new Masonry( masonryElement, {
				columnWidth: '.card-container',
				itemSelector: '.card-container'
			});
		});
	});
});
