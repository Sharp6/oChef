define(['jquery'], function($){
	"use strict";
	
	var loadGerechten = function() {
		return $.getJSON("/api/gerechten").promise();
	};

	var createGerechten = function() {
		return $.ajax({
			url: "/api/gerechten",
			method: "POST"
		}).promise();
	}

	var updateGerecht = function(data) {
		var dataJS = JSON.parse(data);

		if(dataJS.ingredienten) {
			var ingredientIdArray = [];
			dataJS.ingredienten.forEach(function(ingredient) {
				ingredientIdArray.push(ingredient.dbId);
			});	
			dataJS.ingredienten = ingredientIdArray;
		}

		data = JSON.stringify(dataJS);
	
		return $.ajax({
			url: "/api/gerechten/" + dataJS.dbId,
			data: {gerecht: data},
			method: "PUT"
		}).promise();	
	};

	var removeGerecht = function(data) {
		var dataJS = JSON.parse(data);
		return $.ajax({
			url: "/api/gerechten/" + dataJS.dbId,
			method : "DELETE",
			data: {gerecht: data},
		}).promise();
	};

	var saveFile = function(file, gerechtId) {
		var fd = new FormData();
		fd.append("imgFile", file);
		return $.ajax({
			url: "/api/gerechten/" + gerechtId + "/img", 
			method: "POST",
			data: fd,
			processData: false,
			contentType: false
		}).promise();
	};	

	return {
		load : loadGerechten,
		save: updateGerecht,
		remove: removeGerecht,
		create: createGerechten, 
		saveFile: saveFile
	};
});
