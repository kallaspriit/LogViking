define([
	'logviking/Logger',
	'models/LogEntryModel',
	'src/EventEmitter'
], function(logger, LogEntryModel, EventEmitter) {
	'use strict';
	
	var log = logger.get('LogEntriesModel');

	var LogEntriesModel = function() {
		EventEmitter.call(this);

		this.entries = [];
	};

	LogEntriesModel.prototype = Object.create(EventEmitter.prototype);

	LogEntriesModel.Event = LogEntriesModel.prototype.Event = {
		ENTRY_ADDED: 'entry-added',
		CLEARED: 'cleared'
	};

	LogEntriesModel.prototype.add = function(logEntry) {
		//log.info('add entry', logEntry);

		this.entries.push(logEntry);

		this.emit(LogEntriesModel.Event.ENTRY_ADDED, logEntry);
	};

	LogEntriesModel.prototype.clear = function() {
		log.info('clearing');

		this.entries = [];

		this.emit(LogEntriesModel.Event.CLEARED);
	};

	LogEntriesModel.prototype.getFilteredEntries = function() {
		return this.entries; // TODO filter
	};

    return new LogEntriesModel();
});