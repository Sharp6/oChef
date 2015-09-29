define(["knockout", "moment", "da/maaltijd.da.client", "models/gerecht.model.client"], function(ko, moment, maaltijdDA, Gerecht) {
  var maaltijdModel = function(data) {
    var self = this;
    
    self.dbId = ko.observable(data._id || '');
    var myDatum = moment(data.datum);
    self.datum = ko.observable(myDatum.format("YYYY-DD-MM") || '');
    
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
