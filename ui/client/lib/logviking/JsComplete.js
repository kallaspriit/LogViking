define([
], function() {
	'use strict';
	
	return {
		autocomplete: function (value, context) {
			context = context || window;

			var tokens = value.split('.'),
				ref = context,
				hints = [],
				options = [],
				missedToken = null,
				i,
				key;

			for (i = 0; i < tokens.length; i++) {
				if (typeof ref[tokens[i]] === 'undefined') {
					if (i < tokens.length - 1) {
						return [];
					}

					missedToken = tokens[i];

					break;
				}

				ref = ref[tokens[i]];
			}

			if (missedToken === null) {
				return [];
			}

			if (typeof ref === 'object' && ref !== null) {
				for (key in ref) {
					options.push(key);
				}
			} else if (typeof ref === 'string') {
				options = [
					'charAt()', 'charCodeAt()', 'concat()', 'fromCharCode()', 'indexOf()', 'lastIndexOf()',
					'localeCompare()',  'match()', 'replace()', 'search()', 'slice()', 'split()', 'substr()',
					'substring()', 'toLocaleLowerCase()',  'toLocaleUpperCase()', 'toLowerCase()', 'toString()',
					'toUpperCase()', 'trim()', 'valueOf()'
				];
			} else if (typeof ref === 'number') {
				options = [
					'toExponential()', 'toFixed()', 'toPrecision()', 'toString()', 'valueOf()'
				];
			}
			// TODO handle Date etc

			for (i = 0; i < options.length; i++) {
				if (
					options[i].length > missedToken.length
					&& options[i].substr(0, missedToken.length).toLowerCase() === missedToken.toLowerCase()
				) {
					hints.push(options[i]);
				}
			}

			return hints;
		}
	};
});