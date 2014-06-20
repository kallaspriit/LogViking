/* global module */
(function(module) {
	'use strict';

	var RpcInterface = function(socketServer) {
		this._socketServer = socketServer;
		this._listenerIds = [];
	};

	RpcInterface.prototype.log = function(parameters) {
		this._broadcastClients({
			handler: 'log',
			info: parameters
		});
	};

	RpcInterface.prototype.refresh = function() {
		this._broadcastClients({
			handler: 'refresh'
		});
	};

	RpcInterface.prototype.becomeClient = function(parameters, client) {
		console.log('! requested to become client', client.id);

		this._listenerIds.push(client.id);
	};

	RpcInterface.prototype._broadcastClients = function(message) {
		var clients = this._socketServer.getClients(),
			i;

		for (i = 0; i < clients.length; i++) {
			if (this._listenerIds.indexOf(clients[i].id) === -1) {
				continue;
			}

			clients[i].send(message);
		}
	};

	module.exports = RpcInterface;

})(module);