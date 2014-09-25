define([
	'logviking/Logger',
	'logviking/ConsoleLog',
	'logviking/SocketLog',
	'src/UserInterface',
	'src/Server',
	'src/Config'
], function(logger, ConsoleLog, SocketLog, UserInterface, Server, config) {
	'use strict';

	var log = logger.get('Application');

	var Application = function() {
		this._config = config;
		this._ui = null;
		this._server = null;
	};

	Application.prototype.bootstrap = function() {
		this._setupLogger();

		log.info('bootstrapping');

		this._setupConfig();
		this._setupUserInterface();
		this._setupServer();
	};

	Application.prototype._setupLogger = function() {
		logger.addReporter(new ConsoleLog());
		logger.addReporter(new SocketLog('192.168.1.69', 2222));
	};

	Application.prototype._setupConfig = function() {
		log.info('setup config');

		config.init();
	};

	Application.prototype._setupUserInterface = function() {
		log.info('setup user interface');

		this._ui = new UserInterface();
		this._ui.init();
	};


	Application.prototype._setupServer = function() {
		log.info('setup server');

		this._server = new Server(config.serverConfig);
		this._server.init();
	};

	return Application;
});