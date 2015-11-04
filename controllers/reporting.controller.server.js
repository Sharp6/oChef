var reportingController = function(Maaltijd, Gerecht) {

	var getOrphanMaaltijden = function(req,res) {
		var allMaaltijden = Maaltijd.find().populate('gerecht').exec(function(err,result) {
			if(err) {
				res.json(err);
			} else {
				result = JSON.stringify(result);
				//result = result.replace(/\s/g, '');
				var maaltijden = JSON.parse(result);
				
				var filteredMaaltijden = maaltijden.filter(function(maaltijd) {
					return maaltijd.gerecht.maaltijden.indexOf(maaltijd._id) === -1;
				});

				var report = [];
				filteredMaaltijden.forEach(function(maaltijd) {
					report.push({
						maaltijdId: maaltijd._id,
						datum: maaltijd.datum,
						gerecht: maaltijd.gerecht.naam,
						gerechtId: maaltijd.gerecht._id
					})
				})

				res.json(report);	
			}
		});
	}

	return {
		getOrphanMaaltijden: getOrphanMaaltijden
	}
}

module.exports = reportingController;