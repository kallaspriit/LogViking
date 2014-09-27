define([
	'logviking/Logger',
], function(logger) {
	'use strict';

	var log = logger.get('ServerRpcInterface');

	var ServerRpcInterface = function(socketServer) {
		this._socketServer = socketServer;
		this._listenerIds = [];
	};

	ServerRpcInterface.prototype.log = function(parameters) {
		this._broadcastClients({
			handler: 'log',
			info: parameters
		});
	};

	ServerRpcInterface.prototype.refresh = function() {
		this._broadcastClients({
			handler: 'refresh'
		});
	};

	ServerRpcInterface.prototype.becomeClient = function(parameters, client) {
		log.info('requested to become client: ' + client.id);

		this._listenerIds.push(client.id);
	};

	ServerRpcInterface.prototype._broadcastClients = function(message) {
		var clients = this._socketServer.getClients(),
			i;

		for (i = 0; i < clients.length; i++) {
			if (this._listenerIds.indexOf(clients[i].id) === -1) {
				continue;
			}

			clients[i].send(message);
		}
	};

	return ServerRpcInterface;
});