define(['jquery', 'moment'], function($, moment){
	"use strict";
	
	var loadMaaltijden = function() {
		return $.getJSON("/api/maaltijden").promise();
	};

	var createMaaltijd = function() {
		return $.ajax({
			url: "/api/maaltijden",
			method: "POST"
		}).promise();
	}

	var updateMaaltijd = function(data) {
		var dataJS = JSON.parse(data);

		var datum = moment.utc(dataJS.datum, "YYYY-DD-MM").valueOf();
		dataJS.datum = datum;

		if(dataJS.gerecht) {
			var gerechtId = dataJS.gerecht.dbId;
			dataJS.gerecht = gerechtId;
		}

		data = JSON.stringify(dataJS);
	
		return $.ajax({
			url: "/api/maaltijden/" + dataJS.dbId,
			data: {maaltijd: data},
			method: "PUT"
		}).promise();	
	};

	var removeMaaltijd = function(data) {
		var dataJS = JSON.parse(data);
		return $.ajax({
			url: "/api/maaltijden/" + dataJS.dbId,
			method : "DELETE",
			data: {maaltijd: data},
		}).promise();
	}

	return {
		load : loadMaaltijden,
		save: updateMaaltijd,
		remove: removeMaaltijd,
		create: createMaaltijd
	};
});
