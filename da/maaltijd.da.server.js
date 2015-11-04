var maaltijdDA = function(Maaltijd) {
	var updateMaaltijd = function(req) {
		return new Promise(function(resolve,reject) {
			req.maaltijd.save(function(err) {
				if(err) {
					reject(err);
				} else {
					resolve(req.maaltijd);
				}
			});
		});
	}

	var deleteMaaltijd = function(req) {
		return new Promise(function(resolve,reject) {
			req.maaltijd.remove(function(err) {
				if(err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}

	return {
		updateMaaltijd: updateMaaltijd,
		deleteMaaltijd: deleteMaaltijd
	}
}

module.exports = maaltijdDA;