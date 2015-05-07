require.config({
	paths: {
		jquery: '/libraries/jquery-2.1.3.min'
	}
});

define("ingredientData", [], function(){
	"use strict";
	var STORE_NAME = "ingredienten";
	
	var saveIngredientData = function(ingredienten) {
		localStorage.setItem(STORE_NAME, JSON.stringify(ingredienten));
	};
	
	var loadIngredientData = function() {
		var storedIngredienten = localStorage.getItem(STORE_NAME);
		if(storedIngredienten) {
			return JSON.parse(storedIngredienten);
		}
		return [];
	};
	
	var clearIngredientData = function() {
		localStorage.removeItem(STORE_NAME);
	}; 
	
	return {
		save : saveIngredientData,
		load : loadIngredientData,
		clear : clearIngredientData
	};
});


require(["jquery", "ingredientData"], function($, ingredientData) {
			
});