define([
], function() {
	'use strict';

	return {
		convertCallableName: function(name) {
			var dashPos;

			while ((dashPos = name.indexOf('-')) != -1) {
				name = name.substr(0, dashPos) + (name.substr(dashPos + 1, 1)).toUpperCase() + name.substr(dashPos + 2);
			}

			return name;
		}
	};
});
