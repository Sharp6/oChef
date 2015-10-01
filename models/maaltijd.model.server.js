var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Gerecht = require('../models/gerecht.server.model.js');

var maaltijdSchema = new Schema({
	datum: Date,
	nota: String,
	gerecht: {
		type: Schema.Types.ObjectId,
		ref: 'Gerecht'
	}
});

module.exports = mongoose.model('Maaltijd', maaltijdSchema);