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

require(["jquery", "bootstrap", "knockout", "viewmodels/gerechten.vm.client"], function($, bootstrap, ko, GerechtVM) {
	var gVM = new GerechtVM();
	gVM.init();
	ko.applyBindings(gVM);

	$('.nav li').removeClass('active');
 	$('#gerechtenMenu').addClass('active');
});