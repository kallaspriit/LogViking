define([
	'logviking/Logger',
	'src/EventEmitter',
	'src/EventHub',
], function(logger, EventEmitter, eventHub) {
	'use strict';

	var log = logger.get('ServerRpcInterface');

	var ServerRpcInterface = function(socketServer) {
		EventEmitter.call(this);

		this._socketServer = socketServer;
		this._inspectedId = null;
		this._inspectorIds = [];
	};

	ServerRpcInterface.prototype = Object.create(EventEmitter.prototype);

	ServerRpcInterface.Event = ServerRpcInterface.prototype.Event = {
		CLIENTS_CHANGED: 'clients-changed'
	};

	ServerRpcInterface.prototype.log = function(parameters) {
		this._broadcastInspectors({
			handler: 'log',
			info: parameters
		});
	};

	ServerRpcInterface.prototype.refresh = function() {
		log.info('refreshing');

		this._broadcastInspectors({
			handler: 'refresh'
		});
	};

	ServerRpcInterface.prototype.becomeInspector = function(parameters, client) {
		log.info('requested to become an inspector: ' + client.id);

		this._inspectorIds.push(client.id);

		this.emit(ServerRpcInterface.Event.CLIENTS_CHANGED);
	};

	ServerRpcInterface.prototype.becomeInspected = function(parameters, client) {
		log.info('requested to become the inspected: ' + client.id);

		this._inspectedId = client.id;

		this.emit(ServerRpcInterface.Event.CLIENTS_CHANGED);
	};

	ServerRpcInterface.prototype.javascriptAutocompleteResponse = function(parameters/*, client*/) {
		log.info('got autocomplete hints: ' + parameters.hints.join(', '));

		eventHub.emit(eventHub.Change.JAVASCRIPT_AUTOCOMPLETE_HINTS_UPDATED, parameters.hints);
	};

	ServerRpcInterface.prototype.getInspectorCount = function() {
		var clients = this._socketServer.getClients(),
			clientCount = 0,
			i;

		for (i = 0; i < clients.length; i++) {
			if (this._inspectorIds.indexOf(clients[i].id) !== -1) {
				clientCount++;
			}
		}

		return clientCount;
	};

	ServerRpcInterface.prototype.hasInspected = function() {
		var clients = this._socketServer.getClients(),
			i;

		for (i = 0; i < clients.length; i++) {
			if (clients[i].id === this._inspectedId) {
				return true;
			}
		}

		return false;
	};

	ServerRpcInterface.prototype.requestJavascriptAutocomplete = function(value) {
		this._sendToInspected({
			handler: 'javascript-autocomplete',
			parameters: {
				value: value
			}
		});
	};

	ServerRpcInterface.prototype.executeRemoteJavascript = function(value) {
		this._sendToInspected({
			handler: 'execute-javascript',
			parameters: {
				value: value
			}
		});
	};

	ServerRpcInterface.prototype.reloadTarget = function(value) {
		this._sendToInspected({
			handler: 'reload',
			parameters: {}
		});
	};

	ServerRpcInterface.prototype._broadcastInspectors = function(message) {
		var clients = this._socketServer.getClients(),
			i;

		for (i = 0; i < clients.length; i++) {
			if (this._inspectorIds.indexOf(clients[i].id) === -1) {
				continue;
			}

			clients[i].send(message);
		}
	};

	ServerRpcInterface.prototype._sendToInspected = function(message) {
		var clients = this._socketServer.getClients(),
			i;

		for (i = 0; i < clients.length; i++) {
			if (clients[i].id === this._inspectedId) {
				clients[i].send(message);

				break;
			}
		}
	};

	return ServerRpcInterface;
});