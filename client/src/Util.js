define([
], function() {
	'use strict';

	var delayedTasks = {};

	return {
		convertCallableName: function(name) {
			var dashPos;

			while ((dashPos = name.indexOf('-')) != -1) {
				name = name.substr(0, dashPos) + (name.substr(dashPos + 1, 1)).toUpperCase() + name.substr(dashPos + 2);
			}

			return name;
		},

		performDelayed: function(name, callback, delay) {
			delay = delay || 1000;

			if (typeof delayedTasks[name] !== 'undefined' && delayedTasks[name] !== null) {
				window.clearTimeout(delayedTasks[name]);

				delayedTasks[name] = null;
			}

			delayedTasks[name] = window.setTimeout(function() {
				delayedTasks[name] = null;

				callback.apply(callback, [name, delay]);
			}.bind(this), delay);
		}
	};
});
