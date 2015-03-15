var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gerechtSchema = new Schema({
	naam: String,
	nota: String, 
	beschrijving: String
});

module.exports = mongoose.model('Gerecht', gerechtSchema);