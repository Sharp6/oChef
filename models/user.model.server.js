var User = function(mongoose) {
	var Schema = mongoose.Schema;

	var userSchema = new Schema({
		displayName: String,
		image: String,
		email: String,
		role: String,
		google: {
			type: Object
		}
	});

	var model = mongoose.model('User', userSchema);
	return model;
}

module.exports = User;