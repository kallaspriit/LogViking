define([
	'logviking/Logger'
], function(logger) {
	'use strict';
	
	var log = logger.get('LogEntryFilter');

	var LogEntryFilter = function(filters) {
		this._type = filters.type;
		this._time = this._convertTimeStrToMilliseconds(filters.time);
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
			filterType,
			filterEnabled,
			regexp,
			entryTimestamp,
			refTimestamp;

		if (this._time !== -1) {
			entryTimestamp = entry.date.getTime();
			refTimestamp = (new Date()).getTime() - this._time;

			if (entryTimestamp < refTimestamp) {
				return false;
			}
		}

		for (filterType in this._type) {
			filterEnabled = this._type[filterType];

			if (!filterEnabled && entry.type === filterType) {
				return false;
			}
		}

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

	LogEntryFilter.prototype._convertTimeStrToMilliseconds = function(timeStr) {
		var milliseconds = -1,
			regexp = new RegExp('([0-9]+)(m|s)', 'i'),
			matches = regexp.exec(timeStr),
			ammount,
			unit;

		if (matches !== null) {
			ammount = parseInt(matches[1], 10);
			unit = matches[2];

			switch (unit) {
				case 'm':
					milliseconds = ammount * 60 * 1000;
				break;

				case 's':
					milliseconds = ammount * 1000;
				break;
			}
		}

		return milliseconds;
	};

    return LogEntryFilter;
});