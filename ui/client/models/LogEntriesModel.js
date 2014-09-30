define([
	'models/LogEntryModel',
	'logviking/Logger'
], function(LogEntryModel, logger) {
	'use strict';
	
	var log = logger.get('LogEntriesModel');

	var LogEntriesModel = function() {
	
	};
	
	LogEntriesModel.prototype.init = function() {
		log.info('init');
	};

    return LogEntriesModel;
});