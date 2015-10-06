var gerechtCtrl = function(Gerecht, gerechtDA) {
	// Middleware controllers
	var fetchGerecht = function(req,res,next) {
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
	var getGerecht = function(req,res) {
		res.json(req.gerecht);
	}

	var getGerechten = function(req,res) {
		var query = Gerecht.find(req.query).populate('ingredienten');

		query.exec(function(err,results) {
			res.json(results);
		});
	};

	var createGerecht = function(req,res) {
		var gerecht = new Gerecht();
		gerecht.save();
		res.status(201).send(gerecht);
	}

	var updateGerecht = function(req,res) {
		var gerechtData = JSON.parse(req.body.gerecht);

		req.gerecht.naam = gerechtData.naam;
		req.gerecht.nota = gerechtData.nota;
		req.gerecht.takeout = gerechtData.takeout;
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

	var patchGerecht = function(req,res) {
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

	var deleteGerecht = function(req,res) {
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
	var renderGerechten = function(req,res) {
		res.render('container', 
			{
				partials: { body: 'gerechten' }
			});
	};

	return {
		// Middleware
		fetchGerecht: fetchGerecht,
		// API
		getGerecht: getGerecht,
		getGerechten: getGerechten,
		createGerecht: createGerecht,
		updateGerecht: updateGerecht,
		patchGerecht: patchGerecht,
		deleteGerecht: deleteGerecht,
		// Render
		renderGerechten: renderGerechten
	}
}

module.exports = gerechtCtrl;