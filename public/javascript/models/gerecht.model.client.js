define(["knockout", "da/gerecht.da.client", "models/ingredient.model.client", "models/maaltijd.model.client", "da/maaltijd.da.client"], 
function(ko, gerechtDA, Ingredient, Maaltijd, maaltijdDA) {
  var gerechtModel = function(data) {

    var self = this;
    
    self.dbId = ko.observable(data._id || '');
    self.naam = ko.observable(data.naam || '');
    self.beschrijving = ko.observable(data.beschrijving || '');
    self.nota = ko.observable(data.nota || '');
    self.bron = ko.observable(data.bron || '');
    self.recept = ko.observable(data.recept || '');
    self.referentie = ko.observable(data.referentie || '');
    self.rating = ko.observable(data.userRating);
    self.ratings = ko.observableArray();
    self.takeout = ko.observable(data.takeout || false);
    self.ingredienten = ko.observableArray();
    self.inDiepvries = ko.observable(data.inDiepvries || false);
    self.scores =  ko.observableArray();
    self.tags = ko.observableArray(data.tags);
    self.maaltijden = ko.observableArray();
    self.fileData = ko.observable({
      dataURL: ko.observable(),
      file: ko.observable()
    });
    self.imgBoolean = ko.observable(data.image || false);
    self.imgUrl = ko.computed(function() {
      if(self.imgBoolean()) {
        return "/api/gerechten/" + self.dbId() + "/img";  
      } else {
        return "/images/chef.png";
      }
    });
    self.saveFile = function() {
      gerechtDA.saveFile(self.fileData().file(), self.dbId());
    };

    if(data.ingredienten) {
      data.ingredienten.forEach(function(ingredientData) {
        self.ingredienten.push(new Ingredient(ingredientData));
      });  
    }

    if(data.maaltijden && data.maaltijden.length > 0) {
      data.maaltijden.forEach(function(maaltijdData) {
        self.maaltijden.push(new Maaltijd(maaltijdData));
      });
    }

    if(data.historyScore) {
      self.scores.push({ scoreName: 'history', score: data.historyScore, label: 'Recentheids-score' });
    }

    if(data.ratingScore) {
      self.scores.push({ scoreName: 'rating', score: data.ratingScore, label: 'Rating-score' }); 
    }

    if(data.seizoenScore) {
      self.scores.push({ scoreName: 'seizoen', score: data.seizoenScore, label: 'Seizoens-score' }); 
    }

    if(data.ratings) {
      data.ratings.forEach(function(rating) {
        self.ratings.push(rating.waarde);
      });
    }

    // This should be removed
    self.averageRating = ko.computed(function() {
      var totaal = 0;
      self.ratings().forEach(function(ratingWaarde) {
        totaal = totaal + ratingWaarde;
      });
      if(self.ratings().length > 0) {
        totaal = totaal / self.ratings().length;
        return totaal;
      } else {
        return;  
      }
      
    });

    self.addTag = function(tag) {
      // TODO: add logic for not duplicating things
      self.tags.push(tag);
    }

    self.removeTag = function(tag) {
      self.tags.remove(tag);
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

    self.quickSaveMaaltijd = function() {
      maaltijdDA.quickSaveMaaltijd(self.dbId());
    }

  }
  return gerechtModel;
});