define(["knockout", "da/maaltijd.da.client", "models/gerecht.model.client"], function(ko, maaltijdDA, Gerecht) {
  var maaltijdModel = function(data) {
    var self = this;
    
    self.dbId = ko.observable(data._id || '');
    self.datum = ko.observable(data.datum || '');
    
    self.nota = ko.observable(data.nota || '');
    self.gerecht = ko.observable();


    if(data.gerecht) {
      self.gerecht(new Gerecht(data.gerecht));
    }
    
    self.save = function() {
      return maaltijdDA.save(ko.toJSON(self));
    };

    self.remove = function() {
      return maaltijdDA.remove(ko.toJSON(self));
    }

  }
  return maaltijdModel;
});