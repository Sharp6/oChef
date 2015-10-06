var Ingredient = function(mongoose) {
	var Schema = mongoose.Schema;

	var ingredientSchema = new Schema({
		naam: String,
		nota: String, 
		beschrijving: String,
		maandenInSeizoen: [Number],
		tags: [String]
	});

	var model = mongoose.model('Ingredient', ingredientSchema);

	return model;
}

module.exports = Ingredient;