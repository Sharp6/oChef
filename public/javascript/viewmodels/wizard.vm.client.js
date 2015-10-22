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
    self.user = ko.observable();

    self.filteredGerechten = ko.computed(function() {
      var filter = self.filterText().toLowerCase();
      if(!filter) {
        return self.gerechten();
      } else {
        return ko.utils.arrayFilter(self.gerechten(), function(gerecht) {
          return (gerecht.naam().toLowerCase().indexOf(filter) !== -1 || checkIngredienten(gerecht, filter));
        });
      }
    });

    function checkIngredienten(gerecht, filter) {
      var results = ko.utils.arrayFilter(gerecht.ingredienten(), function(ingredient) {
        return ingredient.naam().toLowerCase().indexOf(filter) !== -1;
      });
      return results.length > 0;
    }

    self.loadGerechten = function() {
      gerechtDA.load()
        .then(function(gerechtenData) {
          gerechtenData.forEach(function(gerechtData) {
            var newGerecht = new Gerecht(gerechtData);
            
            newGerecht.rating.subscribe(function(newValue){
              gerechtDA.save(ko.toJSON(newGerecht));
            });

            self.gerechten.push(newGerecht);
          });
      });
    }

    self.init = function() {
      self.loadGerechten();
    }
  };

  return vm;
});