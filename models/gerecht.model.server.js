var Gerecht = function(mongoose, Ingredient) {
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
		ingredienten: [{
			type: Schema.Types.ObjectId,
			ref: 'Ingredient'
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

	var model = mongoose.model('Gerecht', gerechtSchema);
	return model;
}

module.exports = Gerecht;