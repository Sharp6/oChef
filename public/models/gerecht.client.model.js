$(document).ready(function() {
	function Ingredient(data) {
		this.id = data.id;
		this.name = data.name;
	};


	function gerechtModel() {
		var self = this;
		self.gerechtNaam = ko.observable();
		self.nota = ko.observable();
		self.beschrijving = ko.observable();
		self.ingredienten = ko.observableArray([]);
		self.availableIngredienten = ko.observableArray([]);


		$.getJSON("/api/ingredienten", function(allData) {
        	var mappedIngredienten = $.map(allData, function(ingredient) { return new Ingredient(ingredient) });
        	self.availableIngredienten(mappedIngredienten);
    	});
	};

	ko.applyBindings(new gerechtModel());
});