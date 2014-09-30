define([
	'logviking/Logger',
	'logviking/ConsoleLog',
	'logviking/SocketLog',
	'src/UserInterface',
	'src/Server',
	'src/Config',
	'models/LogEntriesModel'
], function(logger, ConsoleLog, SocketLog, UserInterface, server, config, LogEntriesModel) {
	'use strict';

	var log = logger.get('Application');

	var Application = function() {
		this._config = config;
		this._ui = null;
		this._server = null;
		this._logEntries = null;
	};

	Application.prototype.bootstrap = function() {
		this._setupLogger();

		log.info('bootstrapping');

		this._setupConfig();
		this._setupServer();
		this._setupLogEntries();
		this._setupUserInterface();
	};

	Application.prototype._setupLogger = function() {
		logger.addReporter(new ConsoleLog());
		//logger.addReporter(new SocketLog('localhost', 2222));
	};

	Application.prototype._setupConfig = function() {
		log.info('setup config');

		config.init();
	};

	Application.prototype._setupLogEntries = function() {
		log.info('setup log entries');

		this._logEntries = new LogEntriesModel();
	};

	Application.prototype._setupUserInterface = function() {
		log.info('setup user interface');

		this._ui = new UserInterface(this._logEntries);
		this._ui.init();

		this._ui.on(UserInterface.Event.RELOADING, this._onReloading.bind(this));
	};


	Application.prototype._setupServer = function() {
		log.info('starting server on ' + config.server.host + ':' + config.server.port);

		this._server = server;
		this._server.init();

		try {
			this._server.listen(config.server.host, config.server.port);
		} catch (e) {
			log.error('starting server on ' + config.server.host + ':' + config.server.port + 'failed');
		}
	};

	Application.prototype._onReloading = function() {
		log.info('application is reloading');

		this._server.stop();
	};

	return Application;
});