var gerechtCtrl = function(Gerecht, gerechtDA, Busboy) {
	// Middleware controllers
	var fetchGerecht = function(req,res,next) {
		gerechtDA.getGerecht(req.params.id)
			.then(function(gerecht){
				if(gerecht) {
					req.gerecht = gerecht;
					next();
				} else {
					res.status(404).send('Gerecht niet gevonden.');
				}
			}, function(err) {
				console.log(err.stack);
				res.status(500).send(err);
			});
	}

	// API controllers
	var getGerecht = function(req,res) {
		res.json(req.gerecht);
	}

	var getGerechten = function(req,res) {
		var query = Gerecht.find(req.query).populate('ingredienten').sort('naam');

		query.exec(function(err,results) {
			results.forEach(function(gerecht) {
				// Dit dient om de correct userRating te zetten, niet om de userId te zetten.
				gerecht.userId = req.user ? req.user._id : null;
			});

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

		var index = req.gerecht.ratings.findIndex(function(element, index, array) {
			return element.userId == req.user._id;
		});

		if(index === -1) {
			var rating = {};
			rating.waarde = gerechtData.rating;
			rating.userId = req.user._id;
			
			req.gerecht.ratings.push(rating);
			
		} else {
			req.gerecht.ratings[index].waarde = gerechtData.rating;
		}

		gerechtDA.updateGerecht(req.gerecht)
			.then(function(updatedGerecht) {
				res.json(updatedGerecht);
			})
			.catch(function(err) {
				console.log(err.stack);
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

		gerechtDA.updateGerecht(req.gerecht)
			.then(function(updatedGerecht) {
				res.json(updatedGerecht);
			})
			.catch(function(err) {
				console.log(err.stack);
				res.status(500).send(err);
			});
	}

	var deleteGerecht = function(req,res) {
		var gerechtData = JSON.parse(req.body.gerecht);
		gerechtDA.deleteGerecht(req.gerecht)
			.then(function() {
				res.status(204).send('Removed');
			})
			.catch(function(err) {
				console.log(err.stack);
				res.status(500).send(err);
			});
	}

	// Images
	var uploadImage = function(req,res) {
		var busboy = new Busboy({headers: req.headers});
		gerechtDA.getImageStreamer(req.gerecht._id)
			.then(function(writeStream) {
				return new Promise(function(resolve, reject) {
					busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {		
						file.on('data', function(data) {
							writeStream.write(data);
						});

						file.on('end', function() {
							writeStream.end();
						});
					});

					busboy.on('error', function(err) {
						reject(err);
					});

					busboy.on('finish', function() {
						//console.log("busboy is finished.");
					});

					writeStream.on('close', function(file) {
						resolve(req.gerecht);
					});

					req.pipe(busboy);
				});
			}) 
			.then(function(gerecht) {
				gerecht.image = true;
				return gerechtDA.updateGerecht(gerecht);
			})
			.then(function() {
				res.sendStatus(200);
			})
			.catch(function(err) {
				console.log(err.stack);
				res.status(500).send('ERROR', err);
			});
	}

	var downloadImage = function(req,res) {
		gerechtDA.getImageReadStream(req.gerecht._id)
			.then(function(readStream) {
				readStream.on('error', function(err) {
					res.status('404').send('Not found');
				});

				res.setHeader('Content-Type', 'image/jpeg');
				readStream.pipe(res);
			})
			.catch(function(err) {
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
		// Images
		uploadImage: uploadImage,
		downloadImg: downloadImage,
		// Render
		renderGerechten: renderGerechten
	}
}

module.exports = gerechtCtrl;