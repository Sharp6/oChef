define(["knockout", "da/user.da.client"], 
    function(ko, userDA) {

  var vm = function() {
    var self = this;

    self.user = ko.observable();

    self.username = ko.computed(function() {
      if(self.user()) {
        return self.user().displayName;  
      }
      
    });

    self.loadUser = function() {
      userDA.loadUser()
        .then(function(user) {
          self.user(user);
        });
    }

    self.init = function() {
      self.loadUser();
    }
  };

  return vm;
});