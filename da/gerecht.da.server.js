var gerechtDA = function(Gerecht, gfs) {

	var getGerecht = function(id) {
		return new Promise(function(resolve,reject) {
			Gerecht.findById(id).populate('ingredienten').exec(function(err,gerecht) {
				if(err) {
					reject(err);
				} else {
					resolve(gerecht);
				}
			});
		});
	}

	var updateGerecht = function(gerecht) {
		return new Promise(function(resolve,reject) {
			gerecht.save(function(err) {
				if(err) {
					reject(err);
				} else {
					resolve(gerecht);
				}
			});
		});
	}

	var deleteGerecht = function(gerecht) {
		return new Promise(function(resolve,reject) {
			gerecht.remove(function(err) {
				if(err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}

	// Specifics
	var addMaaltijd = function(gerechtId, maaltijdId) {
		return new Promise(function(resolve,reject) {
			Gerecht.findById(gerechtId, function(err, gerecht) {
				if(err) {
					reject(err);
				} else {
					gerecht.maaltijden.push({ _id: maaltijdId });
					gerecht.save(function(err) {
						if(err) {
							reject(err);
						} else {
							resolve(gerecht);
						}
					});
				}
			});
		});
	}

	// IMG
	var checkImage = function(id) {
		return new Promise(function(resolve, reject) {
			gfs.exist({ _id: id }, function(err,found) {
				if(err) {
					reject(err);
				} else {
					resolve(found);
				}
			});	
		});
	}


	var getImageStreamer = function(id) {
		return new Promise(function(resolve, reject) {
			var gfsStream = gfs.createWriteStream({
				_id: id,
				filename: id,
				mode: "w",
				chunkSize: 1024*256,
				content_type: "image/jpeg",
				root: "fs",
				metadata: {
					gerechtId: id
				}
			});
			resolve(gfsStream);
		});
	}

	var getImageReadStream = function(id) {
		return new Promise(function(resolve,reject) {
			var readStream = gfs.createReadStream({
				_id: id,
				mode: 'r'
			});
			resolve(readStream);
		});
	}

	return {
		updateGerecht: updateGerecht,
		deleteGerecht: deleteGerecht,
		getGerecht: getGerecht,
		getImageStreamer: getImageStreamer, 
		getImageReadStream: getImageReadStream,
		addMaaltijd: addMaaltijd
	}
}

module.exports = gerechtDA;