define(["knockout", "da/gerecht.da.client", "da/ingredient.da.client", "models/gerecht.model.client", "models/ingredient.model.client"], function(ko, gerechtDA, ingredientDA, Gerecht, Ingredient) {

	var vm = function() {
		var self = this;

		self.gerechten = ko.observableArray();
        self.allIngredienten = ko.observableArray();

        self.selectedIngredient = ko.observable();

		self.currentGerecht = ko.observable();
		self.isCurrentGerecht = function(candidate) {
			var testGerecht = self.currentGerecht() || new Gerecht({dbId:'bullshit'});
			return candidate.dbId() === testGerecht.dbId();
		}

		self.pageNumber = ko.observable(0);
		self.displayedPageNumber = ko.computed(function() {
			return self.pageNumber() + 1;
		});
		self.gerechtenPerPage = 10;
		self.totalPages = ko.computed(function(){
			var div = Math.floor(self.gerechten().length / self.gerechtenPerPage);
			div += self.gerechten().length % self.gerechtenPerPage > 0 ? 1 : 0;
			return div - 1;
		});
		self.gerechtenOpPagina = ko.computed(function() {
			var first = self.pageNumber() * self.gerechtenPerPage;
			return self.gerechten.slice(first, first + self.gerechtenPerPage);
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

        self.addSelectedIngredient = function() {
            self.currentGerecht().addIngredient(self.selectedIngredient());
        }

        self.removeCurrentGerecht = function() {
        	self.currentGerecht().remove()
        		.then(function() {
        			self.gerechten.remove(self.currentGerecht());
        			self.currentGerecht(self.gerechten()[0]);
        		});
        }

        self.createGerecht = function() {
        	gerechtDA.create()
        		.then(function(newGerecht) {
        			newGerecht.naam = "Nieuw gerecht";
        			var addedGerecht = new Gerecht(newGerecht);
        			self.gerechten.push(addedGerecht);			
        		});
        }

    	self.loadGerechten = function() {
    		gerechtDA.load()
    			.then(function(gerechtenData) {
    				gerechtenData.forEach(function(gerechtData) {
    					self.gerechten.push(new Gerecht(gerechtData));
    				});
    			});
    	}

        self.loadIngredienten = function() {
            ingredientDA.load()
                .then(function(ingredientenData) {
                    ingredientenData.forEach(function(ingredientData) {
                        self.allIngredienten.push(new Ingredient(ingredientData));
                    });
                });
        }

    	self.init = function() {
    		self.loadGerechten();
            self.loadIngredienten();
    	}
    };

	return vm;
});
