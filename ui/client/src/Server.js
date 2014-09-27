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

		this._webSocketServer.listen(host, port);
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

    return Server;
});