define(["knockout", "da/gerecht.da.client", "models/ingredient.model.client"], function(ko, gerechtDA, Ingredient) {
  var gerechtModel = function(data) {

    var self = this;
    
    self.dbId = ko.observable(data._id || '');
    self.naam = ko.observable(data.naam || '');
    self.beschrijving = ko.observable(data.beschrijving || '');
    self.nota = ko.observable(data.nota || '');
    self.takeout = ko.observable(data.takeout || false);
    self.ingredienten = ko.observableArray();
    self.fileData = ko.observable({
      dataURL: ko.observable(),
      file: ko.observable()
    });
    self.saveFile = function() {
      gerechtDA.saveFile(self.fileData().file());
    };

    if(data.ingredienten) {
      data.ingredienten.forEach(function(ingredientData) {
        self.ingredienten.push(new Ingredient(ingredientData));
      });  
    }
    
    self.save = function() {
      //return gerechtCtrl.save(ko.toJSON(self));
      return gerechtDA.save(ko.toJSON(self));
    };

    self.remove = function() {
      return gerechtDA.remove(ko.toJSON(self));
    }

    self.addIngredient = function(ingredient) {
      // TODO: add logic for not duplicating things
      self.ingredienten.push(ingredient);
    }

    self.removeIngredient = function(ingredient) {
      self.ingredienten.remove(ingredient);
    }

  }
  return gerechtModel;
});
