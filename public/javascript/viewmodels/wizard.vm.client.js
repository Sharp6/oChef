define(["knockout", 
    "da/gerecht.da.client", 
    "models/gerecht.model.client", "models/ingredient.model.client"], 
    function(ko, 
        gerechtDA, 
        Gerecht, Ingredient) {

  var vm = function() {
    var self = this;

    self.gerechten = ko.observableArray();

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