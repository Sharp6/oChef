var Maaltijd = require('../models/maaltijd.server.model.js');
var maaltijdDA = require('../da/maaltijd.da.server.js');

// Middleware controllers
exports.fetchMaaltijd = function(req,res,next) {
	Maaltijd.findById(req.params.id).populate('gerecht').exec(function(err,maaltijd) {
		if(err) {
			res.status(500).send(err);
		} else if (maaltijd) {
			req.maaltijd = maaltijd;
			next();
		} else {
			res.status(404).send('Maaltijd not found.');
		}
	});
}

// API controllers
exports.getMaaltijd = function(req,res) {
	res.json(req.maaltijd);
}

exports.getMaaltijden = function(req,res) {
	var query = Maaltijd.find(req.query).populate('gerecht');

	query.exec(function(err,results) {
		res.json(results);
	});
};

exports.createMaaltijd = function(req,res) {
	var maaltijd = new Maaltijd();
	maaltijd.save();
	res.status(201).send(maaltijd);
}

exports.updateMaaltijd = function(req,res) {
	var maaltijdData = JSON.parse(req.body.maaltijd);

	req.maaltijd.datum = maaltijdData.datum;
	req.maaltijd.nota = maaltijdData.nota;
	req.maaltijd.gerecht = maaltijdData.gerecht;

	maaltijdDA.updateMaaltijd(req)
		.then(function(updatedMaaltijd) {
			res.json(updatedMaaltijd);
		})
		.catch(function(err) {
			res.status(500).send(err);
		});
}

exports.patchMaaltijd = function(req,res) {
	var maaltijdData = JSON.parse(req.body.maaltijd);

	for(var field in maaltijd) {
		if(field !== "_id") {
			req.maaltijd[field] = req.body[field];
		}
	}

	maaltijdDA.updateMaaltijd(req)
		.then(function(updatedMaaltijd) {
			res.json(updatedMaaltijd);
		})
		.catch(function(err) {
			res.status(500).send(err);
		});

}

exports.deleteMaaltijd = function(req,res) {
	var maaltijdData = JSON.parse(req.body.maaltijd);
	maaltijdDA.deleteMaaltijd(req)
		.then(function() {
			res.status(204).send('Removed');
		})
		.catch(function(err) {
			console.log("err:" + err);
			res.status(500).send(err);
		});
}

// Render controllers
exports.renderMaaltijden = function(req,res) {
	res.render('container', 
		{
			partials: { body: 'maaltijden' }
		});
};