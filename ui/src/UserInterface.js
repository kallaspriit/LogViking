define([
	'logviking/Logger',
	'jquery',
	'bootstrap',

], function(logger, $) {
	'use strict';
	
	var log = logger.get('UserInterface');

	var UserInterface = function() {
	
	};
	
	UserInterface.prototype.init = function() {
		log.info('init');
	};

    return UserInterface;
});