define(["knockout", "da/ingredient.da.client"], function(ko, ingredientDA) {
  var ingredientModel = function(data) {
    var self = this;
    
    self.dbId = ko.observable(data._id || '');
    self.naam = ko.observable(data.naam || '');
    self.beschrijving = ko.observable(data.beschrijving || '');
    self.nota = ko.observable(data.nota || '');
    self.maandenInSeizoen = ko.observableArray(data.maandenInSeizoen);
  
    self.getMonth = function(number) {
    	var months = ["jan", "feb", "maa", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
    	return months[number - 1];
    }

    self.save = function() {
      return ingredientDA.save(ko.toJSON(self));
    };

    self.remove = function() {
      return ingredientDA.remove(ko.toJSON(self));
    }

  }
  return ingredientModel;
});