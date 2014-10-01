define([
	'logviking/Logger',
	'logviking/ConsoleLog',
	'logviking/SocketLog',
	'src/UserInterface',
	'src/Server',
	'src/State'
], function(logger, ConsoleLog, SocketLog, UserInterface, server, state) {
	'use strict';

	var log = logger.get('Application');

	var Application = function() {
		this._state = state;
		this._ui = null;
		this._server = null;
	};

	Application.prototype.bootstrap = function() {
		this._setupLogger();

		log.info('bootstrapping');

		this._setupConfig();
		this._setupServer();
		this._setupUserInterface();
	};

	Application.prototype.stopServer = function() {
		if (this._server === null || !this._server.isStarted()) {
			return;
		}

		this._server.stop();
	};

	Application.prototype._setupLogger = function() {
		logger.addReporter(new ConsoleLog());
		//logger.addReporter(new SocketLog('localhost', 2222));
	};

	Application.prototype._setupConfig = function() {
		log.info('setup config');

		this._state.init();
	};

	Application.prototype._setupServer = function() {
		log.info('starting server on ' + state.server.host + ':' + state.server.port);

		this._server = server;
		this._server.init();

		try {
			this._server.listen(state.server.host, state.server.port);
		} catch (e) {
			log.error('starting server on ' + state.server.host + ':' + state.server.port + 'failed');
		}
	};

	Application.prototype._setupUserInterface = function() {
		log.info('setup user interface');

		this._ui = new UserInterface();
		this._ui.init();

		this._ui.on(UserInterface.Event.RELOADING, this._onReloading.bind(this));
	};

	Application.prototype._onReloading = function() {
		log.info('application is reloading');

		this._server.stop();
	};

	return Application;
});