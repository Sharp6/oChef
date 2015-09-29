require.config({
	shim : {
		"hotkeys" : { "deps" : ['jquery']},
		"bootstrap" : { "deps" :['jquery'] },
		"typeahead" : { "deps" : ['bootstrap']},
		"binding-typeahead" : { "deps": ['bootstrap']},
		"bootstrap-select" : { "deps" : ['bootstrap'] },
		"datepicker" : { "deps": ['bootstrap-select']}
	},
	paths: {
		jquery: '/libraries/jquery-2.1.3.min',
		knockout: '/libraries/knockout-3.3.0',
		bootstrap: '/libraries/bootstrap.min',
		moment: '/libraries/moment-with-locales.min',
		datepicker: '/libraries/bootstrap-datepicker',
		'bootstrap-select': '/libraries/bootstrap-select'
	}
});

require(["jquery", "bootstrap", "bootstrap-select", "datepicker", "knockout", "viewmodels/maaltijden.vm.client"], function($, bootstrap, bootstrapselect, datepicker, ko, MaaltijdVM) {
	var mVM = new MaaltijdVM();
	mVM.init();
	ko.applyBindings(mVM);

	$('.nav li').removeClass('active');
 	$('#maaltijdenMenu').addClass('active');

	$('#myModal').on('shown.bs.modal', function() {
		$('.datepicker').datepicker({
			format: "yyyy-dd-mm"
		});
	});
});
