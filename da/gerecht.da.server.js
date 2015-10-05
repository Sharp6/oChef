var gerechtDA = function(Gerecht) {
	var updateGerecht = function(req) {
		return new Promise(function(resolve,reject) {
			req.gerecht.save(function(err) {
				if(err) {
					reject(err);
				} else {
					resolve(req.gerecht);
				}
			});
		});
	}

	var deleteGerecht = function(req) {
		return new Promise(function(resolve,reject) {
			req.gerecht.remove(function(err) {
				if(err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}

	return {
		updateGerecht: updateGerecht,
		deleteGerecht: deleteGerecht
	}
}

module.exports = gerechtDA;