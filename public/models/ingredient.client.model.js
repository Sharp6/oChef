$(document).ready(function() {
	function ingredientModel() {
		var self = this;
		
		self.naam = ko.observable('Test');
    self.beschrijving = ko.observable('Beschrijving');
    self.nota = ko.observable('dit is een nota');
		self.maandenInSeizoen = ko.observableArray([]);

		self.save = function() {
			$.ajax("/newIngredient", {
      	data: ko.toJSON({ 
      		naam: self.naam,  
      		beschrijving: self.beschrijving,
      		nota: self.nota,
      		maandenInSeizoen: self.maandenInSeizoen
      	}),
        type: "post", contentType: "application/json",
        success: function(result) { alert(result) }
      });
		};
	}

	ko.applyBindings(new ingredientModel());
});