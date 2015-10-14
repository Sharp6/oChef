var maaltijdController = function(Maaltijd, maaltijdDA) {
	// Middleware controllers
	var fetchMaaltijd = function(req,res,next) {
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
	var getMaaltijd = function(req,res) {
		res.json(req.maaltijd);
	}

	var getMaaltijden = function(req,res) {
		var query = Maaltijd.find(req.query).populate('gerecht').sort('-datum');

		query.exec(function(err,results) {
			res.json(results);
		});
	};

	var createMaaltijd = function(req,res) {
		var maaltijd = new Maaltijd();
		maaltijd.save();
		res.status(201).send(maaltijd);
	}

	var updateMaaltijd = function(req,res) {
		var maaltijdData = JSON.parse(req.body.maaltijd);
		console.log("maaltijdData datum: ");
		console.log(maaltijdData.datum);

		req.maaltijd.datum = maaltijdData.datum;
		req.maaltijd.nota = maaltijdData.nota;
		req.maaltijd.gerecht = maaltijdData.gerecht;

		console.log("req.maaltijd.datum: ");
		console.log(req.maaltijd.datum);

		maaltijdDA.updateMaaltijd(req)
			.then(function(updatedMaaltijd) {
				console.log("updatedMaaltijd:");
				console.log(updatedMaaltijd);
				res.json(updatedMaaltijd);
			})
			.catch(function(err) {
				console.log(err);
				res.status(500).send(err);
			});
	}

	var patchMaaltijd = function(req,res) {
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
				console.log(err);
				res.status(500).send(err);
			});

	}

	var deleteMaaltijd = function(req,res) {
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
	var renderMaaltijden = function(req,res) {
		res.render('container', 
			{
				partials: { body: 'maaltijden' }
			});
	};

	return {
		fetchMaaltijd: fetchMaaltijd,
		getMaaltijd: getMaaltijd,
		getMaaltijden: getMaaltijden,
		createMaaltijd: createMaaltijd,
		updateMaaltijd: updateMaaltijd,
		patchMaaltijd: patchMaaltijd,
		deleteMaaltijd: deleteMaaltijd,
		renderMaaltijden: renderMaaltijden
	}
}

module.exports = maaltijdController;