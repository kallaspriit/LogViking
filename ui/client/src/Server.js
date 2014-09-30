define([
	'logviking/Logger',
	'src/EventEmitter',
	'src/WebSocketServer',
	'src/ServerClient',
	'src/ServerRpcInterface',
], function(logger, EventEmitter, WebSocketServer, ServerClient, ServerRpcInterface) {
	'use strict';

	var log = logger.get('Server');

	var Server = function() {
		WebSocketServer.call(this);

		this._rpcInterface = null;
		this._serverClient = null;
	};

	Server.prototype = Object.create(WebSocketServer.prototype);

	Server.prototype.init = function() {
		log.info('init');

		this._setupRpcInterface();
		this._setupServerClient();
	};

	Server.prototype.listen = function(host, port) {
		WebSocketServer.prototype.listen.apply(this, [host, port]);

		this._serverClient.connect(host, port);
	};

	Server.prototype._setupRpcInterface = function() {
		log.info('setting up RPC interface');

		this._rpcInterface = new ServerRpcInterface(this);

		this._rpcInterface.on(ServerRpcInterface.Event.CLIENTS_CHANGED, function() {
			this.emit(this.Event.CLIENTS_CHANGED);
		}.bind(this));

		this.setRpcInterface(this._rpcInterface);
	};


	Server.prototype._setupServerClient = function() {
		log.info('setting up server client');

		this._serverClient = new ServerClient();
	};

    return new Server();
});