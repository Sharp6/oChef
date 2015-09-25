define(["knockout"], function(ko) {
  var ingredientModel = function(data) {
    var self = this;
    
    self.naam = ko.observable(data.naam || '');
    self.beschrijving = ko.observable(data.beschrijving || '');
    self.nota = ko.observable(data.nota || '');
    self.maandenInSeizoen = ko.observableArray(data.maandenInSeizoen);
  }

  return ingredientModel;
});