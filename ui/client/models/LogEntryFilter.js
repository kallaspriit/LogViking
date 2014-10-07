define([
	'logviking/Logger'
], function(logger) {
	'use strict';
	
	var log = logger.get('LogEntryFilter');

	var LogEntryFilter = function(filters) {
		this._type = filters.type;
		this._time = filters.time; // TODO convert to milliseconds
		this._fields = {
			component: filters.component,
			message: filters.message
		};
	};
	
	LogEntryFilter.prototype.entryPasses = function(entry) {
		var data = {
				component: entry.component,
				message: this._dataArrayToMessage(entry.data)
			},
			regexpComponent,
			regexp;

		// TODO check for time and type

		for (regexpComponent in this._fields) {
			if (this._fields[regexpComponent].length === 0) {
				continue;
			}

			regexp = new RegExp(this._fields[regexpComponent], 'i');

			if (!regexp.test(data[regexpComponent])) {
				return false;
			}
		}

		return true;
	};

	LogEntryFilter.prototype._dataArrayToMessage = function(dataArray) {
		return dataArray.map(function(item) {
			return JSON.stringify(item);
		}).join(' ');
	};

    return LogEntryFilter;
});