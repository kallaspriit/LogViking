define([
], function() {
	'use strict';

	var Platform = function() {
	
	};
	
	Platform.prototype.isNodeEnv = function() {
		return typeof process !== 'undefined';
	};

    return new Platform();
});