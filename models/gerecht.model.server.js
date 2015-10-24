var Gerecht = function(mongoose, moment, Ingredient, Maaltijd) {
	var marked = require('marked');
	var Schema = mongoose.Schema;

	var gerechtSchema = new Schema({
		naam: String,
		nota: String, 
		beschrijving: String,
		recept: String,
		takeout: Boolean,
		image: Boolean,
		bron: String,
		referentie: String,
		userRating: Number,
		inDiepvries: Boolean,
		ingredienten: [{
			type: Schema.Types.ObjectId,
			ref: 'Ingredient'
		}],
		maaltijden: [{
			type: Schema.Types.ObjectId,
			ref: 'Maaltijd'
		}],
		ratings: [{
			userId: {
				type: Schema.Types.ObjectId,
				ref: 'User'
			},
			waarde: Number
		}]
	});

	gerechtSchema.virtual('userId').set(function(userId) {
		var index = this.ratings.findIndex(function(element, index, array) {
			return element.userId == userId;
		});

		if(index !== -1) {
			this.userRating = this.ratings[index].waarde;
		}
	});

	gerechtSchema.virtual('averageRating').get(function() {
		if(this.ratings.length > 0) {
			var totaal = 0;
			var gemiddelde = 0;

      this.ratings.forEach(function(rating) {
        totaal = totaal + rating.waarde;
      });
      gemiddelde = totaal / this.ratings.length;
      
      return gemiddelde;
		} else {
			return;
		}
	});

	gerechtSchema.virtual('ratingScore').get(function() {
		if(this.averageRating) {
			return this.averageRating * 2;	
		} else {
			return undefined;
		}
	});

	gerechtSchema.virtual('aantalMaaltijden').get(function() {
		return this.maaltijden.length;
	});

	gerechtSchema.virtual('seizoenScore').get(function() {
		if(this.ingredienten.length > 0) {
			// gerecht heeft ingredienten 
			var aantalIngredientenInSeizoen = 0;
			var aantalIngredientenMetSeizoen = 0;
			var totaalGerechtScore = 0;

			this.ingredienten.forEach(function(ingredient) {
				if(ingredient.maandenInSeizoen && ingredient.maandenInSeizoen.length > 0) {
					// ingredient heeft seizoensinfo
					aantalIngredientenMetSeizoen++;	
					var ingredientScore = 0;
					if(ingredient.inSeizoen) {
						aantalIngredientenInSeizoen++;
						ingredientScore = 1 - (ingredient.maandenInSeizoen.length / 12);
					}
					totaalGerechtScore = totaalGerechtScore + ingredientScore;
				}
			});
			return Math.round(10 * (totaalGerechtScore / aantalIngredientenMetSeizoen)) || 0;
		} else {
			return 0;
		}
	});

	gerechtSchema.virtual('historyScore').get(function() {
		if(this.maaltijden.length > 0) {
			// Zorg dat je zeker bent dat dit de laatste maaltijd is!
			var daysAgo = calculateHistory(this.maaltijden[0]);
			return determineHistoryScore(daysAgo);
		} else {
			return 10;
		}
	});

	function determineHistoryScore(daysAgo) {
		if(daysAgo < 7) {
			return 0;
		} else if(daysAgo < 14) {
			return 4;
		} else if(daysAgo < 21) {
			return 6;
		} else if(daysAgo < 30) {
			return 8;
		} else {
			return 10;
		}
	}

	function calculateHistory(maaltijd) {
		var maaltijdMoment = moment(maaltijd.datum);
		var nowMoment = moment();

		var daysAgo = nowMoment.diff(maaltijdMoment, 'days');

		return daysAgo;
	}

	gerechtSchema.set('toJSON', { virtuals: true });
	gerechtSchema.set('toObject', { virtuals: true });

	var model = mongoose.model('Gerecht', gerechtSchema);
	return model;
}

module.exports = Gerecht;



