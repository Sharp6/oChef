define(["knockout", "moment", "da/maaltijd.da.client", "models/maaltijd.model.client"], 
function(ko, moment, maaltijdDA, Maaltijd) {

	function calculateRatingScores(gerechten) {
		return new Promise(function(resolve,reject) {
			gerechten().forEach(function(gerecht) {
				
				
				if(gerecht.averageRating()) {
					var ratingScore = ko.observable();
					ratingScore(gerecht.averageRating() * 2);
					addScore(gerecht, { label: 'Rating', score: ratingScore });
				}
			});
			resolve();
		});
	}

	function calculateHistoryScores(gerechten) {
		return loadMaaltijden()
			.then(function(maaltijdArray) {
				var allMaaltijden = ko.observableArray(maaltijdArray);

				var maxAantalDagen = 0;
				var scoredGerechten = [];

				gerechten().forEach(function(gerecht) {
					var lastMaaltijd = ko.utils.arrayFirst(allMaaltijden(), function(maaltijd) {
						return maaltijd.gerecht().dbId() == gerecht.dbId();
					});
					var numberOfDays;
					if(lastMaaltijd) {
						 numberOfDays = calculateHistory(lastMaaltijd);	
						 if(numberOfDays > maxAantalDagen) {
						 	maxAantalDagen = numberOfDays;
						 }
						 scoredGerechten.push({ gerecht: gerecht, days: numberOfDays });
					}
				});

				scoredGerechten.forEach(function(scoredGerecht) {
					var historyScore = ko.observable();
					historyScore(Math.round(10 * (scoredGerecht.days / maxAantalDagen)));

					addScore(scoredGerecht.gerecht, { label: 'Tijd geleden', score: historyScore});
				});
			});
	}

	function calculateSeizoenScores(gerechten) {
		return new Promise(function(resolve,reject) {
			gerechten().forEach(function(gerecht) {
				if(gerecht.ingredienten().length > 0) {
					// Gerecht heeft ingredienten

					var aantalIngredientenInSeizoen = 0;
					var aantalIngredientenMetSeizoen = 0;
					var totaalGerechtScore = 0;
					var gerechtScore = ko.observable();

					gerecht.ingredienten().forEach(function(ingredient) {

						if(ingredient.maandenInSeizoen().length > 0) {
							// ingredient heeft seizoensinfo
							aantalIngredientenMetSeizoen++;	
							var ingredientScore = 0;

							var nowMoment = moment();
							var nowMonth = nowMoment.month() + 1;

							var zeldzaamheid = (1 - (ingredient.maandenInSeizoen().length / 12));

							if(ingredient.maandenInSeizoen().indexOf(nowMonth) !== -1) {
								// ingredient is in seizoen
								aantalIngredientenInSeizoen++;
								ingredientScore = zeldzaamheid;
							}

							totaalGerechtScore = totaalGerechtScore + ingredientScore;
						}
					});
					gerechtScore(Math.round(10 * (totaalGerechtScore / aantalIngredientenMetSeizoen)) || 0);
					addScore(gerecht, { label: 'In seizoen', score: gerechtScore });
				}
			});
		});
	}

	function addScore(gerecht, newScore) {
		var oldScore = ko.utils.arrayFirst(gerecht.scores(), function(score) {
			return score.label == newScore.label;
		});
		if(oldScore) {
			gerecht.scores.splice(gerecht.scores.indexOf(oldScore),1);
		} 
		gerecht.scores.push(newScore);
	}

	function calculateHistory(maaltijd) {
		var maaltijdMoment = moment(maaltijd.datum(), 'YYYY-DD-MM');
		var nowMoment = moment();

		var daysAgo = nowMoment.diff(maaltijdMoment, 'days');

		return daysAgo;
	}

	function calculateTotalScore(gerecht, histortyBoolean, ratingBoolean, seizoenBoolean) {
		console.log("Calculating totals!");
		var score = 0;
		if(histortyBoolean) {
			var historyScore = ko.utils.arrayFirst(gerecht.scores(), function(score) {
				return score.label == 'Tijd geleden';
			});
			if(historyScore) {
				score = score + historyScore.score();
			}
		}

		if(ratingBoolean) {
			var ratingScore = ko.utils.arrayFirst(gerecht.scores(), function(score) {
				return score.label == 'Rating';
			});
			if(ratingScore) {
				score = score + ratingScore.score();
			}
		}

		if(seizoenBoolean) {
			var seizoenScore = ko.utils.arrayFirst(gerecht.scores(), function(score) {
				return score.label == 'In seizoen';
			});
			if(seizoenScore) {
				score = score + seizoenScore.score();
			}
		}

		if(!score) {
			score = 0;
		}

		addScore(gerecht, { label: 'Totaal', score: score });

		return score;
	}



	function loadMaaltijden() {
	  return maaltijdDA.load()
			.then(function(maaltijdenData) {
				var maaltijdArray = [];
				maaltijdenData.forEach(function(maaltijdData) {
	      	maaltijdArray.push(new Maaltijd(maaltijdData));
	      });
	      return maaltijdArray;
	    });
	}


	return {
		calculateHistoryScores: calculateHistoryScores,
		calculateRatingScores : calculateRatingScores,
		calculateSeizoenScores: calculateSeizoenScores,
		calculateTotalScore: calculateTotalScore
	}
})