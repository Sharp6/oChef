define(["knockout", 
    "da/gerecht.da.client", 
    "models/gerecht.model.client", "models/ingredient.model.client",
    "logic/chefAlyzer"], 
    function(ko, 
        gerechtDA, 
        Gerecht, Ingredient,
        chefAlyzer) {

  var vm = function() {
    var self = this;

    self.gerechten = ko.observableArray();
    self.filterText = ko.observable('');
    self.user = ko.observable();

    self.historySort = ko.observable();
    self.ratingSort = ko.observable();
    self.seizoenSort = ko.observable();

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

    self.sortedGerechten = ko.observableArray();
    self.sortGerechten = ko.computed(function() {
      if(!self.historySort() && !self.ratingSort() && !self.seizoenSort()) {
        // No sort criteria selected 
        self.sortedGerechten(self.filteredGerechten());
        return self.filteredGerechten;
      } else {
        // Got sorting criteria!
        self.filteredGerechten().forEach(function(gerecht) {
          chefAlyzer.calculateTotalScore(gerecht, self.historySort(), self.ratingSort(), self.seizoenSort());
        });

        var sortedArray = self.filteredGerechten().sort(function(left,right) {

          var leftScore = ko.utils.arrayFirst(left.scores(), function(score) {
            return score.label == "Totaal";
          });

          var rightScore = ko.utils.arrayFirst(right.scores(), function(score) {
            return score.label == "Totaal";
          });

          if(leftScore.score == rightScore.score) {
            return 0;
          } else {
            return leftScore.score < rightScore.score ? 1 : -1;  
          }
          
        });

        self.sortedGerechten(sortedArray);

        return self.filteredGerechten;

      }
    });

    function checkIngredienten(gerecht, filter) {
      var results = ko.utils.arrayFilter(gerecht.ingredienten(), function(ingredient) {
        return ingredient.naam().toLowerCase().indexOf(filter) !== -1;
      });
      return results.length > 0;
    }

    self.calculateScores = function() {
      chefAlyzer.calculateRatingScores(self.filteredGerechten);
      chefAlyzer.calculateHistoryScores(self.filteredGerechten);
      chefAlyzer.calculateSeizoenScores(self.filteredGerechten);
    };

    self.loadGerechten = function() {
      return gerechtDA.load()
        .then(function(gerechtenData) {
          gerechtenData.forEach(function(gerechtData) {
            var newGerecht = new Gerecht(gerechtData);
            
            newGerecht.rating.subscribe(function(newValue){
              gerechtDA.save(ko.toJSON(newGerecht));
            });

            console.log(gerechtData);

            self.gerechten.push(newGerecht);
          });
      });
    }

    self.init = function() {
      self.loadGerechten()
        .then(self.calculateScores);
    }
  };

  return vm;
});