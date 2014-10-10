define([
], function() {
	'use strict';

	var ConsoleLog = function(config) {
		var key;

		config = config || {};

		this._config = {
			padComponent: true,
			componentNameWidth: 25,
			timeWidth: 8,
			trackTime: true,
			useColors: true,
			colors: [
				'lightseagreen',
				'forestgreen',
				'goldenrod',
				'dodgerblue',
				'darkorchid',
				'crimson',
				'darkred',
				'darkslategray'
			]
		};
		this._colorIndex = 0;
		this._componentToColorIndexMap = {};
		this._componentLastLogTime = {};

		if (typeof config === 'object' && config !== null) {
			for (key in config) {
				this._config[key] = config[key];
			}
		}
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
		var parameters = Array.prototype.slice.call(arguments, 0),
			deltaTime = null,
			renderTime,
			currentTime,
			timeUnit,
			type,
			component,
			paddedComponent,
			color,
			data;

		if (parameters.length < 3) {
			console[type].apply(console, parameters);
		}

		type = parameters.shift();
		component = parameters.shift();

		paddedComponent = component;

		if (this._config.padComponent) {
			if (component.length + 1 > this._config.componentNameWidth) {
				this._config.componentNameWidth = component.length + 1;
			}

			if (paddedComponent.length < this._config.componentNameWidth) {
				paddedComponent = this._pad(paddedComponent, this._config.componentNameWidth);
			}
		}

		if (this._config.useColors) {
			if (typeof this._componentToColorIndexMap[component] === 'undefined') {
				this._componentToColorIndexMap[component] = this._colorIndex;

				this._colorIndex = (this._colorIndex + 1) % this._config.colors.length;
			}

			color = this._config.colors[this._componentToColorIndexMap[component]];
			data = ['%c' + paddedComponent, 'color: ' + color + ';'].concat(parameters);
		} else {
			data = [paddedComponent].concat(parameters);
		}

		if (this._config.trackTime) {
			currentTime = (new Date()).getTime();

			if (typeof this._componentLastLogTime[component] !== 'undefined') {
				deltaTime = currentTime - this._componentLastLogTime[component];
			}

			this._componentLastLogTime[component] = currentTime;

			if (deltaTime !== null) {
				renderTime = deltaTime;
				timeUnit = 'ms';

				if (deltaTime > 60000) {
					renderTime = (deltaTime / 60000).toPrecision(2);
					timeUnit = 'm';
				} else if (deltaTime > 2000) {
					renderTime = (deltaTime / 1000).toPrecision(3);
					timeUnit = 's';
				}

				data[0] = this._pad(renderTime.toString() + timeUnit, this._config.timeWidth) + data[0];
			} else {
				data[0] = this._pad('', this._config.timeWidth) + data[0];
			}
		}

		console[type].apply(console, data);
	};

	ConsoleLog.prototype._pad = function(str, width) {
		var padSize = width - str.length + 1;

		if (padSize < 1) {
			return str;
		}

		return (Array(padSize).join(' ')) + str;
	};

	return ConsoleLog;
});
