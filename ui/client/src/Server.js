define([
	'logviking/Logger',
	'src/EventEmitter',
	'src/WebSocketServer',
	'src/ServerRpcInterface',
], function(logger, EventEmitter, WebSocketServer, ServerRpcInterface) {
	'use strict';

	var log = logger.get('Server');

	var Server = function() {
		WebSocketServer.call(this);

		this._rpcInterface = null;
	};

	Server.prototype = Object.create(WebSocketServer.prototype);

	Server.prototype.init = function() {
		log.info('init');

		this._setupRpcInterface();
	};

	Server.prototype._setupRpcInterface = function() {
		log.info('setting up RPC interface');

		this._rpcInterface = new ServerRpcInterface(this);

		this.setRpcInterface(this._rpcInterface);
	};

    return new Server();
});