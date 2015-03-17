$(document).ready(function() {
	function ingredientModel() {
		var self = this;
		self.naam = ko.observable('Test');
        self.beschrijving = ko.observable('Beschrijving');
        self.nota = ko.observable('dit is een nota');
		self.maandenInSeizoen = ko.observableArray([]);
    }

    ko.applyBindings(new ingredientModel());
});