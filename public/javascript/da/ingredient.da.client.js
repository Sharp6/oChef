define(['jquery'], function($){
	"use strict";
	
	var loadIngredienten = function() {
		return $.getJSON("/api/ingredienten").promise();
	};

	return {
		load : loadIngredienten
	};
});