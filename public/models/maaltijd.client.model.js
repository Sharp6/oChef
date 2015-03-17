$(document).ready(function() {
	function Gerecht(data) {
		this.id = data.id;
		this.name = data.name;
	};

	function maaltijdModel() {
		var self = this;
		self.gerecht = ko.observable();
		self.nota = ko.observable();
		self.datum = ko.observable();
		self.availableGerechten = ko.observableArray([]);


		$.getJSON("/api/gerechten", function(allData) {
        	var mappedGerechten = $.map(allData, function(gerecht) { return new Gerecht(gerecht) });
        	self.availableGerechten(mappedGerechten);
    	});
	};

	ko.applyBindings(new maaltijdModel());
});