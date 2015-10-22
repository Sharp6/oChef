require.config({
	shim : {
		"hotkeys" : { "deps" : ['jquery'] },
		"bootstrap" : { "deps" :['jquery']  },
		"typeahead" : { "deps" : ['bootstrap'] },
		"binding-typeahead" : { "deps": ['bootstrap'] },
		"knockoutFileBindings" : { "deps": ['knockout', 'jquery'] },
		"knockoutMarkdownBindings" : { "deps" : ['knockout', 'markdown-it'] },
		"koStarRating" : { "deps" : ['knockout', 'jquery']}
	},
	paths: {
		jquery: '/libraries/jquery-2.1.3.min',
		knockout: '/libraries/knockout-3.3.0',
		knockoutFileBindings: '/libraries/knockout-file-bindings',
		knockoutMarkdownBindings: '/libraries/knockout.markdown',
		"markdown-it": '/libraries/markdown-it.min',
		bootstrap: '/libraries/bootstrap.min',
		moment: '/libraries/moment-with-locales.min',
		koStarRating: '/libraries/ko-starRating'
	}
});

require(["jquery", "bootstrap", "knockout", "knockoutFileBindings", "koStarRating", "knockoutMarkdownBindings", "viewmodels/gerechten.vm.client"], 
function($, bootstrap, ko, koFileBindings, koStarRating, koMarkdownBindings, GerechtVM) {
	var gVM = new GerechtVM();
	gVM.init();
	ko.applyBindings(gVM);

	$('.nav li').removeClass('active');
 	$('#gerechtenMenu').addClass('active');
});
