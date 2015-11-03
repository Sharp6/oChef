require.config({
	shim : {
		"hotkeys" : { "deps" : ['jquery'] },
		"bootstrap" : { "deps" :['jquery']  },
		"typeahead" : { "deps" : ['bootstrap'] },
		"binding-typeahead" : { "deps": ['bootstrap'] },
		"knockoutFileBindings" : { "deps": ['knockout', 'jquery'] },
		"knockoutMarkdownBindings" : { "deps" : ['knockout', 'markdown'] },
		"koStarRating" : { "deps" : ['knockout', 'jquery'] },
		"knockoutTypeaheadBinding" : { "deps" : ['bootstrap', 'typeahead' ]}
	},
	paths: {
		jquery: '/libraries/jquery-2.1.3.min',
		knockout: '/libraries/knockout-3.3.0',
		knockoutFileBindings: '/libraries/knockout-file-bindings',
		knockoutMarkdownBindings: '/libraries/knockout.markdown',
		markdown: '/libraries/markdown-it.min',
		bootstrap: '/libraries/bootstrap.min',
		moment: '/libraries/moment-with-locales.min',
		koStarRating: '/libraries/ko-starRating',
		typeahead: '/libraries/bootstrap3-typeahead.min',
		knockoutTypeaheadBinding: '/libraries/binding-typeahead'
	}
});

require(["jquery", "bootstrap", "typeahead", "knockout", "knockoutFileBindings", "koStarRating", "knockoutMarkdownBindings", "knockoutTypeaheadBinding", "viewmodels/gerechten.vm.client"], 
function($, bootstrap, typeahead, ko, koFileBindings, koStarRating, koMarkdownBindings, koTypeaheadBinding, GerechtVM) {
	var gVM = new GerechtVM();
	gVM.init();
	ko.applyBindings(gVM);

	$('.nav li').removeClass('active');
 	$('#gerechtenMenu').addClass('active');
});
