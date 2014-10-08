define([
	'logviking/Logger',
	'src/EventEmitter',
	'src/WebSocketServer',
	'src/ServerClient',
	'src/ServerRpcInterface',
	'models/LogEntriesModel'
], function(logger, EventEmitter, WebSocketServer, ServerClient, ServerRpcInterface, logEntries) {
	'use strict';

	var log = logger.get('Server');

	// provide dummy implementation on the browser
	if (typeof require === 'undefined') {
		return {
			started: false,

			init: function() {},
			setRpcInterface: function() {},
			getRpcInterface: function() {
				return {
					hasInspected: function() {
						return true;
					}
				};
			},

			listen: function() {
				this._started = true;
			},

			isStarted: function() {
				return this._started;
			},

			stop: function() {
				this._started = false;
			},

			on: function() {},

			Event: {}
		};
	}

	var Server = function() {
		WebSocketServer.call(this);

		this._rpcInterface = null;
		this._serverClient = null;
	};

	Server.prototype = Object.create(WebSocketServer.prototype);

	Server.prototype.init = function() {
		log.info('init');

		this._setupServerClient();
		this._setupRpcInterface();
	};

	Server.prototype.listen = function(host, port) {
		WebSocketServer.prototype.listen.apply(this, [host, port]);

		this._serverClient.connect(host, port);
	};

	Server.prototype._setupServerClient = function() {
		log.info('setting up server client');

		this._serverClient = new ServerClient();
		this._serverClient.on(ServerClient.Event.LOG_ENTRY_RECEIVED, this._onLogEntryReceived.bind(this));
		this._serverClient.on(ServerClient.Event.REFRESH_REQUESTED, this._onRefreshRequested.bind(this));
	};

	Server.prototype._setupRpcInterface = function() {
		log.info('setting up RPC interface');

		this._rpcInterface = new ServerRpcInterface(this);

		this._rpcInterface.on(ServerRpcInterface.Event.CLIENTS_CHANGED, function() {
			this.emit(this.Event.CLIENTS_CHANGED);
		}.bind(this));

		this.setRpcInterface(this._rpcInterface);
	};

	Server.prototype._onLogEntryReceived = function(logEntry) {
		logEntries.add(logEntry);
	};

	Server.prototype._onRefreshRequested = function() {
		logEntries.clear();
	};

    return new Server();
});