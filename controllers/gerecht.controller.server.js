var Ingredient = require('../models/ingredient.server.model.js');
var Gerecht = require('../models/gerecht.server.model.js');
var gerechtDA = require('../da/gerecht.da.server.js');

// Middleware controllers
exports.fetchGerecht = function(req,res,next) {
	Gerecht.findById(req.params.id).populate('ingredienten').exec(function(err,gerecht) {
		if(err) {
			res.status(500).send(err);
		} else if (gerecht) {
			req.gerecht = gerecht;
			next();
		} else {
			res.status(404).send('Gerecht not found.');
		}
	});
}

// API controllers
exports.getGerecht = function(req,res) {
	res.json(req.gerecht);
}

exports.getGerechten = function(req,res) {
	var query = Gerecht.find(req.query).populate('ingredienten');

	query.exec(function(err,results) {
		res.json(results);
	});
};

exports.createGerecht = function(req,res) {
	var gerecht = new Gerecht();
	gerecht.save();
	res.status(201).send(gerecht);
}

exports.updateGerecht = function(req,res) {
	var gerechtData = JSON.parse(req.body.gerecht);

	req.gerecht.naam = gerechtData.naam;
	req.gerecht.nota = gerechtData.nota;
	req.gerecht.beschrijving = gerechtData.beschrijving;
	req.gerecht.ingredienten = gerechtData.ingredienten;

	gerechtDA.updateGerecht(req)
		.then(function(updatedGerecht) {
			res.json(updatedGerecht);
		})
		.catch(function(err) {
			res.status(500).send(err);
		});
}

exports.patchGerecht = function(req,res) {
	var gerechtData = JSON.parse(req.body.gerecht);

	for(var field in gerecht) {
		if(field !== "_id") {
			req.gerecht[field] = req.body[field];
		}
	}

	gerechtDA.updateGerecht(req)
		.then(function(updatedGerecht) {
			res.json(updatedGerecht);
		})
		.catch(function(err) {
			res.status(500).send(err);
		});

}

exports.deleteGerecht = function(req,res) {
	var gerechtData = JSON.parse(req.body.gerecht);
	gerechtDA.deleteGerecht(req)
		.then(function() {
			res.status(204).send('Removed');
		})
		.catch(function(err) {
			console.log("err:" + err);
			res.status(500).send(err);
		});
}

// Render controllers
exports.renderGerechten = function(req,res) {
	res.render('container', 
		{
			partials: { body: 'gerechten' }
		});
};

