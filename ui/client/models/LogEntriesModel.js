define([
	'logviking/Logger',
	'models/LogEntryModel',
	'src/EventEmitter',
	'src/EventHub'
], function(logger, LogEntryModel, EventEmitter, eventHub) {
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
		eventHub.emit(eventHub.Change.LOG_ENTRIES);
	};

	LogEntriesModel.prototype.clear = function() {
		log.info('clearing');

		this.entries = [];

		this.emit(LogEntriesModel.Event.CLEARED);
		eventHub.emit(eventHub.Change.LOG_ENTRIES);
	};

	LogEntriesModel.prototype.getFilteredEntries = function(filter) {
		var filteredEntries = [],
			i;

		for (i = 0; i < this.entries.length; i++) {
			if (filter.entryPasses(this.entries[i])) {
				filteredEntries.push(this.entries[i]);
			}
		}

		return filteredEntries;
	};

    return new LogEntriesModel();
});