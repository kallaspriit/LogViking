(function(module) {
	'use strict';

	var WebSocket = require('ws'),
		util = require('./Util'),
		SocketServer = WebSocket.Server;

	var WebsocketServer = function() {
		this._socket = null;
		this._clients = [];
		this._rpcInterface = null;
		this._clientIdCounter = 0;
		this._requestIdCounter = 0;
	};

	WebsocketServer.prototype.setRpcInterface = function(rpcInterface) {
		this._rpcInterface = rpcInterface;
	};

	WebsocketServer.prototype.getNextRequestId = function(rpcInterface) {
		return this._requestIdCounter++;
	};

	WebsocketServer.prototype.listen = function(host, port) {
		this._socket = new SocketServer({
			host: host,
			port: port,
			protocolVersion: 13
		});

		this._socket.on('connection', function(client) {
			this._clients.push(client);

			client.id = ++this._clientIdCounter;

			this.log('! Client #' + client.id + ' connected (' + this._clients.length + ' total)');

			client.on('message', function(message, flags) {
				if (flags.binary) {
					//this.log('[' + client.id + '] > Ignoring binary data');

					return true; // binary data is handled by the uploader
				}

				//this.log('[' + client.id + '] > ' + (message.length < 300 ? message : message.substr(0, 300) + '...'));

				if (message.substr(0, 1) === '{') {
					//console.log('message', message, JSON.parse(message));

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
							this.log('- Calling handler "' + rpcMethodName + '" threw error: ' + e.message);

							success = false;
							errorMessage = e.message;
						}
					} else {
						this.log('- Invalid rpc method "' + rpcMethodName + '" requested');

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
						this.log('! Client #' + this._clients[i].id + ' disconnected [' + code + '] ' + message);

						continue;
					}

					newClients.push(this._clients[i]);
				}

				this._clients = newClients;
			}.bind(this));

			client.send = function(message) {
				if (this.client.readyState !== WebSocket.OPEN) {
					this.log(
						'- Unable to send message to #' + this.client.id +', invalid state: ' +
						this.client.readyState, message
					);

					return null;
				}

				if (typeof(message) === 'object') {
					message = JSON.stringify(message);
				}

				/*this.log(
					'[' + this.client.id + '] < ' + (message.length < 300 ? message : message.substr(0, 300) + '...')
				);*/

				return this.send.call(this.client, message);
			}.bind({ client: client, send: client.send, log: this.log });

			this.onClientConnected(client);
		}.bind(this));
	};

	WebsocketServer.prototype.broadcast = function(message) {
		for (var i = 0; i < this._clients.length; i++) {
			this._clients[i].send(message);
		}
	};

	WebsocketServer.prototype.getSocket = function() {
		return this._socket;
	};

	WebsocketServer.prototype.getClients = function() {
		return this._clients;
	};

	WebsocketServer.prototype.onClientConnected = function() {};

	WebsocketServer.prototype.log = function() {
		//console.log.apply(console.log, arguments);
	};

	module.exports = WebsocketServer;

})(module);