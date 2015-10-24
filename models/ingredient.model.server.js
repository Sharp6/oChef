var Ingredient = function(mongoose,moment) {
	var Schema = mongoose.Schema;

	var ingredientSchema = new Schema({
		naam: String,
		nota: String, 
		beschrijving: String,
		inDiepvries: Boolean,
		maandenInSeizoen: [Number],
		tags: [String]
	});

	ingredientSchema.virtual('inSeizoen').get(function() {
		if(this.maandenInSeizoen.length > 0) {
			// We hebben seizoensinfo!
			var nowMoment = moment();
			var nowMonth = nowMoment.month() + 1;

			if(this.maandenInSeizoen.indexOf(nowMonth) !== -1) {
				// ingredient is in seizoen
				return true;
			} else {
				return false;
			}
		} else {
			return undefined;
		}
	});

	ingredientSchema.set('toJSON', { virtuals: true, getters: true });
	ingredientSchema.set('toObject', { virtuals: true, getters: true });

	var model = mongoose.model('Ingredient', ingredientSchema);

	return model;
}

module.exports = Ingredient;