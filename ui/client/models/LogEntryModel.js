define([
	'logviking/Logger'
], function(logger) {
	'use strict';
	
	var log = logger.get('LogEntryModel');

	var LogEntryModel = function() {
	
	};
	
	LogEntryModel.prototype.init = function() {
		log.info('init');
	};

    return LogEntryModel;
});