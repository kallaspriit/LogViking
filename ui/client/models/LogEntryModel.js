define([
], function() {
	'use strict';

	var LogEntryModel = function(data) {
		this.id = data.id;
		this.date = data.date;
		this.type = data.type;
		this.component = data.component;
		this.data = data.data;
	};

    return LogEntryModel;
});