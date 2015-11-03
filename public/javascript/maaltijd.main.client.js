require.config({
	shim : {
		"jquery": { "exports": "$" },
		"hotkeys" : { "deps" : ['jquery']},
		"bootstrap" : { "deps" :['jquery']},
		"typeahead" : { "deps" : ['bootstrap']},
		"binding-typeahead" : { "deps": ['bootstrap']},
		//"bootstrap-select" : { "deps" : ['bootstrap'] },
		"datepicker" : { "deps": ['bootstrap']},
		"kodatepicker" : { 'deps' : ['datepicker'] }
	},
	paths: {
		jquery: '/libraries/jquery-2.1.3.min',
		knockout: '/libraries/knockout-3.3.0',
		bootstrap: '/libraries/bootstrap.min',
		moment: '/libraries/moment-with-locales.min',
		datepicker: '/libraries/bootstrap-datepicker',
		//'bootstrap-select': '/libraries/bootstrap-select',
		kodatepicker : '/libraries/ko-datepicker'
	}
});

require(["jquery", "bootstrap", "knockout", "kodatepicker", "viewmodels/maaltijden.vm.client"], 
	function($, bootstrap, ko, kodatepicker, MaaltijdVM) {
	var mVM = new MaaltijdVM();
	mVM.init();
	ko.applyBindings(mVM);

	$('.nav li').removeClass('active');
 	$('#maaltijdenMenu').addClass('active');
});
