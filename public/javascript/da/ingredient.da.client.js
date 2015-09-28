define(['jquery'], function($){
	"use strict";
	
	var loadIngredienten = function() {
		return $.getJSON("/api/ingredienten").promise();
	};

	var createIngredient = function() {
		return $.ajax({
			url: "/api/ingredienten",
			method: "POST"
		}).promise();
	}

	var updateIngredient = function(data) {
		var dataJS = JSON.parse(data);
		return $.ajax({
			url: "/api/ingredienten/" + dataJS.dbId,
			data: {ingredient: data},
			method: "PUT"
		}).promise();	
	};

	var removeIngredient = function(data) {
		var dataJS = JSON.parse(data);
		return $.ajax({
			url: "/api/ingredienten/" + dataJS.dbId,
			method : "DELETE",
			data: {ingredient: data},
		}).promise();
	}

	return {
		load : loadIngredienten,
		save: updateIngredient,
		remove: removeIngredient,
		create: createIngredient
	};
});