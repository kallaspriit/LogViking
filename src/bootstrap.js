(function(exports, $) {
	'use strict';

	exports.logger = new exports.LoggerClient(exports.config);

	$(document).ready(function() {
		exports.logger.bootstrap();
	});
})(window, jQuery);