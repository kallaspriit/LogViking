define([
	'logviking/Logger',
	'logviking/ConsoleLog',
	'logviking/SocketLog'
], function(logger, ConsoleLog, SocketLog) {
	'use strict';

	var log = logger.get('Application');

	var Application = function() {
		this._setupLogger();
	};

	Application.prototype.bootstrap = function() {
		log.info('bootstrapping');
	};

	Application.prototype._setupLogger = function() {
		logger.addReporter(new ConsoleLog());
		logger.addReporter(new SocketLog('192.168.1.69', 2222));
	};

	return Application;
});