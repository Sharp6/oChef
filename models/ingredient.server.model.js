var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ingredientSchema = new Schema({
	naam: String,
	nota: String, 
	beschrijving: String,
	maandenInSeizoen: [Number]
});

module.exports = mongoose.model('Ingredient', ingredientSchema);