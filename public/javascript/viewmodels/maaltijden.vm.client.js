define(["knockout", "da/maaltijd.da.client", "da/gerecht.da.client", "models/gerecht.model.client", "models/maaltijd.model.client"], function(ko, maaltijdDA, gerechtDA, Gerecht, Maaltijd) {

	var vm = function() {
		var self = this;

		self.maaltijden = ko.observableArray();
        self.allGerechten = ko.observableArray();

        self.selectedGerecht = ko.observable();
        self.confirmGerecht = function() {
            self.currentMaaltijd().gerecht(self.selectedGerecht());
        }
		self.currentMaaltijd = ko.observable();
		self.isCurrentMaaltijd = function(candidate) {
			var testMaaltijd = self.currentMaaltijd() || new Maaltijd({dbId:'bullshit', gerecht: { naam:'bullshit' }});
			return candidate.dbId() === testMaaltijd.dbId();
		}

		self.pageNumber = ko.observable(0);
		self.displayedPageNumber = ko.computed(function() {
			return self.pageNumber() + 1;
		});
		self.maaltijdenPerPage = 10;
		self.totalPages = ko.computed(function(){
			var div = Math.floor(self.maaltijden().length / self.maaltijdenPerPage);
			div += self.maaltijden().length % self.maaltijdenPerPage > 0 ? 1 : 0;
			return div - 1;
		});
		self.maaltijdenOpPagina = ko.computed(function() {
			var first = self.pageNumber() * self.maaltijdenPerPage;
			return self.maaltijden.slice(first, first + self.maaltijdenPerPage);
		});
		self.hasPrevious = ko.computed(function() {
            return self.pageNumber() !== 0;
        });
        self.hasNext = ko.computed(function() {
            return self.pageNumber() !== self.totalPages();
        });
        self.next = function() {
            if(self.pageNumber() < self.totalPages()) {
                self.pageNumber(self.pageNumber() + 1);
            }
        }
        self.previous = function() {
            if(self.pageNumber() != 0) {
                self.pageNumber(self.pageNumber() - 1);
            }
        }

        self.editMode = ko.observable(false);
        self.notEditMode = ko.computed(function() {
        	return !self.editMode();
        });
        self.switchEditMode = function() {
        	self.editMode(!self.editMode());
        }
        self.editModeClass = ko.computed(function() {
        	return self.editMode() ? "btn-fill" : "";
        });

        self.createMaaltijd = function() {
        	maaltijdDA.create()
        		.then(function(newMaaltijd) {
        			var addedMaaltijd = new Maaltijd(newMaaltijd);
        			self.maaltijden.push(addedMaaltijd);			
        		});
        }

    	self.loadGerechten = function() {
    		gerechtDA.load()
    			.then(function(gerechtenData) {
    				gerechtenData.forEach(function(gerechtData) {
    					self.allGerechten.push(new Gerecht(gerechtData));
    				});
    			});
    	}

        self.loadMaaltijden = function() {
            maaltijdDA.load()
                .then(function(maaltijdenData) {
                    maaltijdenData.forEach(function(maaltijdData) {
                        self.maaltijden.push(new Maaltijd(maaltijdData));
                    });
                });
        }

        self.removeCurrentMaaltijd = function() {
            self.currentMaaltijd().remove()
                .then(function() {
                    self.maaltijden.remove(self.currentMaaltijd());
                    self.currentMaaltijd(self.maaltijden()[0]);
                });
        }

    	self.init = function() {
    		self.loadGerechten();
            self.loadMaaltijden();
    	}
    };

	return vm;
});
