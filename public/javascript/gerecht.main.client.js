require.config({
	shim : {
		"hotkeys" : { "deps" : ['jquery'] },
		"bootstrap" : { "deps" :['jquery']  },
		"typeahead" : { "deps" : ['bootstrap'] },
		"binding-typeahead" : { "deps": ['bootstrap'] },
		"knockoutFileBindings" : { "deps": ['knockout', 'jquery'] },
		"knockoutMarkdownBindings" : { "deps" : ['knockout', 'markdown'] }
	},
	paths: {
		jquery: '/libraries/jquery-2.1.3.min',
		knockout: '/libraries/knockout-3.3.0',
		knockoutFileBindings: '/libraries/knockout-file-bindings',
		knockoutMarkdownBindings: '/libraries/knockout.markdown.js',
		markdown: '/libraries/markdown-it.min',
		bootstrap: '/libraries/bootstrap.min',
		moment: '/libraries/moment-with-locales.min'
	}
});

require(["jquery", "bootstrap", "knockout", "knockoutFileBindings", "knockoutMarkdownBindings", "viewmodels/gerechten.vm.client"], 
function($, bootstrap, ko, koFileBindings, koMarkdownBindings, GerechtVM) {
	var gVM = new GerechtVM();
	gVM.init();
	ko.applyBindings(gVM);

	$('.nav li').removeClass('active');
 	$('#gerechtenMenu').addClass('active');
});
