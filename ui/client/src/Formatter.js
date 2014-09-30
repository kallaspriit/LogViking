define([
], function() {
	'use strict';

	var Formatter = function() {};
	
	Formatter.prototype.format = function(value, level, undefined) {
		level = level || 0;

		var result = '',
			name,
			key,
			i;

		if (typeof(value) === 'string') {
			if (value.substr(0, 8) === '<{[DATE:') {
				value = new Date(value.substr(8, value.length - 11));
			} else if (value === '<{[UNDEFINED]}>') {
				value = undefined;
			}
		}

		if (value === null) {
			return '<span class="value-null" title="null">null</span>';
		} else if (typeof(value) === 'string' && value.substr(0, 12) === '<{[FUNCTION:') {
			name = value.substr(12, value.length - 15);

			return '<span class="value-function" title="function">[function' +
				(name.length > 0 ? ':' + name : '') + ']</span>';
		} else if (value instanceof Date) {
			return '<span class="value-date" title="Date">' + this._formatDatetime(value) + '</span>';
		} else if (typeof(value) === 'boolean') {
			return '<span class="value-boolean ' + (value ? 'true' : 'false') +
				'" title="boolean">' + value + '</span>';
		} else if (typeof(value) === 'undefined') {
			return '<span class="value-undefined" title="undefined">undefined</span>';
		} else if (typeof(value) === 'number') {
			return '<span class="value-number" title="number">' + value + '</span>';
		} else if (typeof(value) === 'string') {
			return '<span class="value-string" title="string">' +
				(level > 1 ? '\'' : '') + value.replace('<', '&lt;').replace('>', '&gt;') +
				(level > 1 ? '\'' : '') + '</span>';
		} else if (typeof(value) === 'function') {
			return '<span class="value-function" title="function">[function]</span>';
		} else if (Object.prototype.toString.call(value) === '[object Array]') {
			result = '';

			if (level > 0) {
				result += '<span class="value-array" title="array">[';
			}

			for (i = 0; i < value.length; i++) {
				if (i > 0) {
					result += ', ';
				}

				result += this.format(value[i], level + 1);
			}

			if (level > 0) {
				result += ']</span>';
			}
		} else if (Object.prototype.toString.call(value) === '[object Object]') {
			//return '<span class="value-object" title="object">' + JSON.stringify(value) + '</span>';

			result = '<span class="value-object" title="object">{';
			i = 0;

			for (key in value) {
				if (i > 0) {
					result += ', ';
				}

				result += this.format(key, level + 1) + ': ' + this.format(value[key], level + 1);

				i++;
			}

			result += '}</span>';
		} else {
			return '<span class="value-other" title="unknown type">[other]</span>';
		}

		return result;
	};
	
	Formatter.prototype._formatDate = function(date, includeYear) {
		if (typeof(includeYear) == 'undefined') {
			includeYear = true;
		}

		var year = date.getFullYear(),
			month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1),
			day = (date.getDate() < 10 ? '0' : '') + date.getDate();


		return day + '.' + month + (includeYear ? '.' + year : '');
	};

	Formatter.prototype._formatTime = function(date, includeSeconds) {
		includeSeconds = typeof(includeSeconds) != 'undefined' ? includeSeconds : true;

		return (date.getHours() < 10 ? '0' : '') + date.getHours() +
			':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() +
			(includeSeconds ? ':' + (date.getSeconds() < 10 ? '0' : '') +
			date.getSeconds() : '');
	};

	Formatter.prototype._formatDatetime = function(date) {
		return this._formatDate(date, true) + ' ' + this._formatTime(date);
	};
	
    return new Formatter();
});