define([
	'logviking/Logger',
	'src/EventEmitter',
	'src/ServerClient',
	'src/Util',
], function(logger, EventEmitter, ServerClient, util) {
	'use strict';

	// provide dummy implementation on the browser
	if (typeof require === 'undefined') {
		return null;
	}

	var WebSocket = require('ws'),
		SocketServer = WebSocket.Server,
		log = logger.get('WebSocketServer');

	var WebSocketServer = function() {
		EventEmitter.call(this);

		this._socket = null;
		this._started = false;
		this._clients = [];
		this._rpcInterface = null;
		this._clientIdCounter = 0;
		this._requestIdCounter = 0;
	};

	WebSocketServer.prototype = Object.create(EventEmitter.prototype);

	WebSocketServer.Event = WebSocketServer.prototype.Event = {
		STARTED: 'started',
		STOPPED: 'stopped',
		CLIENT_CONNECTED: 'client-connected',
		CLIENT_DISCONNECTED: 'client-disconnected',
		CLIENTS_CHANGED: 'clients-changed',
		ERROR: 'error'
	};

	WebSocketServer.prototype.setRpcInterface = function(rpcInterface) {
		log.info('setting RPC interface');

		this._rpcInterface = rpcInterface;
	};

	WebSocketServer.prototype.getRpcInterface = function() {
		return this._rpcInterface;
	};

	WebSocketServer.prototype.getNextRequestId = function(/*rpcInterface*/) {
		return this._requestIdCounter++;
	};

	WebSocketServer.prototype.listen = function(host, port) {
		log.info('listening to ' + host + ':' + port);

		this._socket = new SocketServer({
			host: host,
			port: port,
			protocolVersion: 13
		});

		this._started = true;

		this.emit(WebSocketServer.Event.STARTED);

		this._socket.on('connection', function(client) {
			this._clients.push(client);

			client.id = ++this._clientIdCounter;

			log.info('client #' + client.id + ' connected (' + this._clients.length + ' total)');

			client.on('message', function(message, flags) {
				if (flags.binary) {
					log.info('[' + client.id + '] > ignoring binary data');

					return true;
				}

				log.info('[' + client.id + '] > ' + (message.length < 300 ? message : message.substr(0, 300) + '...'));

				if (message.substr(0, 1) === '{') {
					var request = JSON.parse(message),
						parameters = request.parameters,
						rpcMethodName = util.convertCallableName(request.handler),
						response = null,
						success = true,
						errorMessage = null;

					if (typeof(this._rpcInterface[rpcMethodName]) === 'function') {
						try {
							response = this._rpcInterface[rpcMethodName].call(
								this._rpcInterface,
								parameters,
								client
							);
						} catch (e) {
							log.error('calling handler "' + rpcMethodName + '" threw error: ' + e.message);

							success = false;
							errorMessage = e.message;
						}
					} else {
						log.error('invalid rpc method "' + rpcMethodName + '" requested');

						success = false;
					}

					if (request.expectResponse) {
						var sendResponse = function(isSuccess, data, error) {
							var response = {
								type: 'response',
								requestId: request.id,
								success: isSuccess,
								data: typeof(data) !== 'undefined' ? data : null,
								error: error || null
							};

							client.send(response);
						};

						if (
							typeof(response) === 'object'
							&& response !== null
							&& typeof(response.done) === 'function'
						) {
							response
								.done(function(data) {
									sendResponse(true, data);
								})
								.fail(function(error) {
									sendResponse(false, null, error);
								});
						} else {
							sendResponse(success, response, errorMessage);
						}
					}
				}
			}.bind(this));

			client.on('close', function(code, message) {
				if (typeof(message) !== 'string' || message.length === 0) {
					message = '';
				}

				var newClients = [],
					i;

				for (i = 0; i < this._clients.length; i++) {
					if (this._clients[i] === client) {
						log.info('client #' + this._clients[i].id + ' disconnected [' + code + '] ' + message);

						continue;
					}

					newClients.push(this._clients[i]);
				}

				this._clients = newClients;

				this._onClientDisconnected(client);
			}.bind(this));

			client.send = function(message) {
				if (this.client.readyState !== WebSocket.OPEN) {
					log.warn(
						'unable to send message to #' + this.client.id +', invalid state: ' +
						this.client.readyState, message
					);

					return null;
				}

				if (typeof(message) === 'object') {
					message = JSON.stringify(message);
				}

				log.info(
					'[' + this.client.id + '] < ' + (message.length < 300 ? message : message.substr(0, 300) + '...')
				);

				return this.send.call(this.client, message);
			}.bind({ client: client, send: client.send, log: this.log });

			this._onClientConnected(client);
		}.bind(this));

		this._socket.on('error', function(e) {
			log.error('error: ' + e.message);

			this._clients = [];

			if (this._started) {
				this._started = false;

				this.emit(WebSocketServer.Event.STOPPED);
				this.emit(WebSocketServer.Event.ERROR, e.message, e.code);
			}
		}.bind(this));
	};

	WebSocketServer.prototype.stop = function() {
		if (!this._started) {
			log.warn('stopping server requested but not started');

			return;
		}

		try {
			this._socket.close();
		} catch (e) {
			log.error('closing socket failed: ' + e.message);
		}

		this._started = false;
		this._clients = [];

		this.emit(WebSocketServer.Event.STOPPED);
	};

	WebSocketServer.prototype.isStarted = function() {
		return this._started;
	};

	WebSocketServer.prototype.isClientConnected = function() {
		if (!this.isStarted()) {
			return false;
		}

		if (this._rpcInterface === null || typeof this._rpcInterface.isClientConnected  !== 'function') {
			return false;
		}

		return this._rpcInterface.isClientConnected();
	};

	WebSocketServer.prototype._isConnectionValid = function() {
		return this._socket !== null && this._socket.readyState === WebSocket.OPEN;
	};

	WebSocketServer.prototype.broadcast = function(message) {
		for (var i = 0; i < this._clients.length; i++) {
			this._clients[i].send(message);
		}
	};

	WebSocketServer.prototype.getSocket = function() {
		return this._socket;
	};

	WebSocketServer.prototype.getClients = function() {
		return this._clients;
	};

	WebSocketServer.prototype._onClientDisconnected = function(client) {
		this.emit(WebSocketServer.Event.CLIENT_DISCONNECTED, client);
		this.emit(WebSocketServer.Event.CLIENTS_CHANGED, this._clients);
	};

	WebSocketServer.prototype._onClientConnected = function(client) {
		this.emit(WebSocketServer.Event.CLIENT_CONNECTED, client);
		this.emit(WebSocketServer.Event.CLIENTS_CHANGED, this._clients);
	};

	return WebSocketServer;
});