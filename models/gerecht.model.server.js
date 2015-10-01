var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ingredient = require('../models/ingredient.model.server');

var gerechtSchema = new Schema({
	naam: String,
	nota: String, 
	beschrijving: String,
	ingredienten: [{
		type: Schema.Types.ObjectId,
		ref: 'Ingredient'
	}]
});

module.exports = mongoose.model('Gerecht', gerechtSchema);
