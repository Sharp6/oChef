var Gerecht = function(mongoose, Ingredient) {
	var Schema = mongoose.Schema;

	var gerechtSchema = new Schema({
		naam: String,
		nota: String, 
		beschrijving: String,
		takeout: Boolean,
		image: Boolean,
		ingredienten: [{
			type: Schema.Types.ObjectId,
			ref: 'Ingredient'
		}]
	});

	var model = mongoose.model('Gerecht', gerechtSchema);
	return model;
}

module.exports = Gerecht;