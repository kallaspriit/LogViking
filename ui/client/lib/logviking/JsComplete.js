define([
], function() {
	'use strict';
	
	return {
		autocomplete: function (input, context) {
			context = context || window;

			var tokens = input.split('.'),
				ref = context,
				hints = [],
				missedToken = null,
				i,
				key;

			for (i = 0; i < tokens.length; i++) {
				if (typeof ref[tokens[i]] === 'undefined') {
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
					if (key.substr(0, missedToken.length).toLowerCase() === missedToken.toLowerCase()) {
						hints.push(key);
					}
				}
			}

			return hints;
		}
	};
});