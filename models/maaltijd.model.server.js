var Maaltijd = function(mongoose, Gerecht) {
	var Schema = mongoose.Schema;
	var maaltijdSchema = new Schema({
		datum: Date,
		nota: String,
		gerecht: {
			type: Schema.Types.ObjectId,
			ref: 'Gerecht'
		}
	});

	var model = mongoose.model('Maaltijd', maaltijdSchema);
	return model;
}

module.exports = Maaltijd;