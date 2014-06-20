(function(module) {
	'use strict';

	var	WebsocketServer = require('./WebsocketServer'),
		RpcInterface = require('./RpcInterface');

	var LoggerServer = function(config) {
		this._config = config;
		this._ws = null;
	};

	LoggerServer.prototype.bootstrap = function() {
		this._setupSocketServer(
			this._config.websocket.host,
			this._config.websocket.port
		);

		this._setupRpcInterface();
	};

	LoggerServer.prototype._setupRpcInterface = function() {
		console.log('! Setting up RPC interface');

		this._rpcInterface = new RpcInterface(this._ws);

		this._ws.setRpcInterface(this._rpcInterface);
	};

	LoggerServer.prototype._setupSocketServer = function(host, port) {
		console.log('! Starting socket server on ' + host + ':' + port);

		this._ws = new WebsocketServer();
		this._ws.listen(host, port);
	};

	module.exports = LoggerServer;

})(module);