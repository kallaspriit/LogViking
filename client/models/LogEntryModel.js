define([
], function() {
	'use strict';

	var LogEntryModel = function(data) {
		this.id = data.id || 0;
		this.date = data.date || new Date();
		this.type = data.type || 'error';
		this.component = data.component || 'unknown';
		this.data = data.data || [];

		if (Object.prototype.toString.call(this.date) !== '[object Date]' || isNaN(this.date.getTime())) {
			this.date = new Date();
		}
	};

    return LogEntryModel;
});