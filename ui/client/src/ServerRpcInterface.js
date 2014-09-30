define([
	'logviking/Logger',
	'src/EventEmitter'
], function(logger, EventEmitter) {
	'use strict';

	var log = logger.get('ServerRpcInterface');

	var ServerRpcInterface = function(socketServer) {
		EventEmitter.call(this);

		this._socketServer = socketServer;
		this._listenerIds = [];
	};

	ServerRpcInterface.prototype = Object.create(EventEmitter.prototype);

	ServerRpcInterface.Event = ServerRpcInterface.prototype.Event = {
		CLIENTS_CHANGED: 'clients-changed'
	};

	ServerRpcInterface.prototype.log = function(parameters) {
		this._broadcastClients({
			handler: 'log',
			info: parameters
		});
	};

	ServerRpcInterface.prototype.refresh = function() {
		log.info('refreshing');

		this._broadcastClients({
			handler: 'refresh'
		});
	};

	ServerRpcInterface.prototype.becomeClient = function(parameters, client) {
		log.info('requested to become client: ' + client.id);

		this._listenerIds.push(client.id);

		this.emit(ServerRpcInterface.Event.CLIENTS_CHANGED);
	};

	ServerRpcInterface.prototype.getClientCount = function() {
		var clients = this._socketServer.getClients(),
			clientCount = 0,
			i;

		for (i = 0; i < clients.length; i++) {
			if (this._listenerIds.indexOf(clients[i].id) !== -1) {
				clientCount++;
			}
		}

		return clientCount;
	};

	ServerRpcInterface.prototype.getReporterCount = function() {
		var clients = this._socketServer.getClients(),
			reporterCount = 0,
			i;

		for (i = 0; i < clients.length; i++) {
			if (this._listenerIds.indexOf(clients[i].id) === -1) {
				reporterCount++;
			}
		}

		return reporterCount;
	};

	ServerRpcInterface.prototype.isClientConnected = function() {
		return this.getReporterCount() > 0 && this.getClientCount() > 0;
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