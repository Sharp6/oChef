define(["knockout", "da/ingredient.da.client", "models/ingredient.model.client"], function(ko, ingredientDA, Ingredient) {

	var vm = function() {
		var self = this;

		self.ingredienten = ko.observableArray();




		self.currentIngredient = ko.observable();
		self.isCurrentIngredient = function(candidate) {
			var testIngredient = self.currentIngredient() || new Ingredient({dbId:'bullshit'});
			return candidate.dbId() === testIngredient.dbId();
		}



		self.pageNumber = ko.observable(0);
		self.displayedPageNumber = ko.computed(function() {
			return self.pageNumber() + 1;
		});
		self.ingredientsPerPage = 10;
		self.totalPages = ko.computed(function(){
			var div = Math.floor(self.ingredienten().length / self.ingredientsPerPage);
			div += self.ingredienten().length % self.ingredientsPerPage > 0 ? 1 : 0;
			return div - 1;
		});
		self.ingredientenOpPagina = ko.computed(function() {
			var first = self.pageNumber() * self.ingredientsPerPage;
			return self.ingredienten.slice(first, first + self.ingredientsPerPage);
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



        self.removeCurrentIngredient = function() {
        	self.currentIngredient().remove()
        		.then(function() {
        			self.ingredienten.remove(self.currentIngredient());
        			self.currentIngredient(self.ingredienten()[0]);
        		});
        }

        self.createIngredient = function() {
        	ingredientDA.create()
        		.then(function(newIngredient) {
        			newIngredient.naam = "Nieuw ingredient";
        			var addedIngredient = new Ingredient(newIngredient);
        			self.ingredienten.push(addedIngredient);			
        		});
        }

		self.loadIngredienten = function() {
			ingredientDA.load()
				.then(function(ingredientenData) {
					ingredientenData.forEach(function(ingredientData) {
						self.ingredienten.push(new Ingredient(ingredientData));
					});
				});
		}

		self.init = function() {
			self.loadIngredienten();
		}
	};

	return vm;
});
