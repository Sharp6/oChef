define(["knockout", 
    "da/gerecht.da.client", 
    "models/gerecht.model.client", "models/ingredient.model.client"], 
    function(ko, 
        gerechtDA, 
        Gerecht, Ingredient) {

  var vm = function() {
    var self = this;

    self.gerechten = ko.observableArray();
    self.filterText = ko.observable('');

    self.filteredGerechten = ko.computed(function() {
      var filter = self.filterText().toLowerCase();
      if(!filter) {
        return self.gerechten();
      } else {
        return ko.utils.arrayFilter(self.gerechten(), function(gerecht) {
          return gerecht.naam().toLowerCase().indexOf(filter) !== -1;
        });
      }
    });

    self.loadGerechten = function() {
      gerechtDA.load()
        .then(function(gerechtenData) {
          gerechtenData.forEach(function(gerechtData) {
            self.gerechten.push(new Gerecht(gerechtData));
          });
      });
    }

    self.init = function() {
      self.loadGerechten();
    }
  };

  return vm;
});