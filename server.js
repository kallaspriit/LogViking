(function(require) {
	'use strict';

	if (typeof(require) !== 'function') {
		// running in browser, don't attempt to start the server
		return;
	}

	var config = require('./server/config'),
		LoggerServer = require('./server/LoggerServer'),
		server = new LoggerServer(config);

	server.bootstrap();
})(typeof(require) === 'function' ? require : null);