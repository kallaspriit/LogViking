define([
	'logviking/Logger',
	'src/WebSocketServer',
	'src/ServerRpcInterface',
], function(logger, WebSocketServer, ServerRpcInterface) {
	'use strict';

	var log = logger.get('Server');

	var Server = function() {
		this._webSocketServer = null;
		this._rpcInterface = null;
	};
	
	Server.prototype.init = function() {
		log.info('init');

		this._setupSocketServer();
		this._setupRpcInterface();
	};

	Server.prototype.listen = function(host, port) {
		log.info('starting socket server on ' + host + ':' + port);

		try {
			this._webSocketServer.listen(host, port);
		} catch (e) {
			log.error('failed to start socket server on ' + host + ':' + port);
		}
	};

	Server.prototype.stop = function() {
		log.info('stopping server');

		this._webSocketServer.stop();
	};

	Server.prototype.isStarted = function() {
		return this._webSocketServer.isStarted();
	};

	Server.prototype._setupSocketServer = function() {
		log.info('setup web socket server');

		this._webSocketServer = new WebSocketServer();
	};

	Server.prototype._setupRpcInterface = function() {
		log.info('setting up RPC interface');

		this._rpcInterface = new ServerRpcInterface(this._webSocketServer);

		this._webSocketServer.setRpcInterface(this._rpcInterface);
	};

    return new Server();
});