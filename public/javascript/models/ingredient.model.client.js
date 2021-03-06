define(["knockout", "da/ingredient.da.client"], function(ko, ingredientDA) {
  var ingredientModel = function(data) {
    var self = this;
    
    self.dbId = ko.observable(data._id || '');
    self.naam = ko.observable(data.naam || '');
    self.beschrijving = ko.observable(data.beschrijving || '');
    self.nota = ko.observable(data.nota || '');
    self.inDiepvries = ko.observable(data.inDiepvries || false);
    self.maandenInSeizoen = ko.observableArray(data.maandenInSeizoen);
    self.tags = ko.observableArray(data.tags);
    self.inSeizoen = ko.observable(data.inSeizoen);
  
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

    self.addTag = function(tag) {
      // TODO: add logic for not duplicating things
      self.tags.push(tag);
    }

    self.removeTag = function(tag) {
      self.tags.remove(tag);
    }

    self.seizoenClass = ko.computed(function() {
      if(self.inSeizoen()) {
        return 'label-success';
      } else if(self.inSeizoen() === false) {
        return 'label-danger';
      } else {
        return 'label-info';
      }
    })

  }
  return ingredientModel;
});