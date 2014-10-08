define([
], function() {
	'use strict';

	var ConsoleLog = function() {
		this._activeComponent = null;
		this._groupTimeout = null;
	};

	ConsoleLog.prototype.log = function() {
		this._log.apply(this, ['log'].concat(Array.prototype.slice.call(arguments, 0)));
	};

	ConsoleLog.prototype.info = function() {
		this._log.apply(this, ['info'].concat(Array.prototype.slice.call(arguments, 0)));
	};

	ConsoleLog.prototype.warn = function() {
		this._log.apply(this, ['warn'].concat(Array.prototype.slice.call(arguments, 0)));
	};

	ConsoleLog.prototype.error = function() {
		this._log.apply(this, ['error'].concat(Array.prototype.slice.call(arguments, 0)));
	};

	ConsoleLog.prototype._log = function(type, component) {
		if (component !== this._activeComponent) {
			if (this._activeComponent !== null) {
				console.groupEnd();
			}

			console.group(component);

			this._activeComponent = component;
		}

		console[type].apply(console, Array.prototype.slice.call(arguments, 0).slice(1));

		if (this._groupTimeout !== null) {
			window.clearTimeout(this._groupTimeout);

			this._groupTimeout = null;
		}

		this._groupTimeout = window.setTimeout(function() {
			console.groupEnd();

			this._activeComponent = null;
			this._groupTimeout = null;
		}.bind(this), 500);
	};

	return ConsoleLog;
});
