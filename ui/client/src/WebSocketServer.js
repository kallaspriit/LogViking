define([
	'logviking/Logger',
	'src/Util',
], function(logger, util) {
	'use strict';

	if (typeof require === 'undefined') {
		return function() {
			this.setRpcInterface = function() {};
			this.listen = function() {};
		};
	}

	var WebSocket = require('ws'),
		SocketServer = WebSocket.Server,
		log = logger.get('WebSocketServer');

	var WebSocketServer = function() {
		this._socket = null;
		this._started = false;
		this._clients = [];
		this._rpcInterface = null;
		this._clientIdCounter = 0;
		this._requestIdCounter = 0;
	};

	WebSocketServer.prototype.setRpcInterface = function(rpcInterface) {
		log.info('setting RPC interface');

		this._rpcInterface = rpcInterface;
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

			this.onClientConnected(client);
		}.bind(this));
	};

	WebSocketServer.prototype.stop = function() {
		if (!this._started) {
			log.warn('stopping server requested but not started');

			return;
		}

		this._socket.close();
	};

	WebSocketServer.prototype.isStarted = function() {
		return this._started;
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

	WebSocketServer.prototype.onClientConnected = function() {};

	return WebSocketServer;
});