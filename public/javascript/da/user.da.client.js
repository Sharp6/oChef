define(['jquery'], function($){
	"use strict";

	var loadUser = function() {
		return $.getJSON("/users/getUser").promise();
	};

	return {
		loadUser: loadUser
	};
});