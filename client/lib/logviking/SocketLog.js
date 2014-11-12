define([
	'logviking/JsComplete'
], function(jsComplete) {
	'use strict';

	/**
	 * Logs data to a websocket.
	 *
	 * @class SocketLog
	 * @constructor
	 * @module Core
	 */
	var SocketLog = function(host, port) {
		this._ws = null;
		this._host = host;
		this._port = port;
		this._messageCount = 0;
		this._requestQueue = [];
		this._hadValidConnection = false;

		this._connect(this._host, this._port);
	};

	SocketLog.prototype.log = function() {
		this._log.apply(this, ['log'].concat(Array.prototype.slice.call(arguments, 0)));
	};

	SocketLog.prototype.info = function() {
		this._log.apply(this, ['info'].concat(Array.prototype.slice.call(arguments, 0)));
	};

	SocketLog.prototype.warn = function() {
		this._log.apply(this, ['warn'].concat(Array.prototype.slice.call(arguments, 0)));
	};

	SocketLog.prototype.error = function() {
		this._log.apply(this, ['error'].concat(Array.prototype.slice.call(arguments, 0)));
	};

	SocketLog.prototype._log = function(type, component) {
		var parameters = Array.prototype.slice.call(arguments, 0).slice(2),
			clone;

		/*try {
			if (parameters !== null && typeof parameters === 'object' && !Array.isArray(parameters)) {
				clone = jQuery.extend(true, {}, parameters);
			} else {
				clone = parameters;
			}
		} catch (e) {
			return;
		}*/

		try {
			this._request('log', {
				type: type,
				component: component,
				//parameters: this._preprocessData(clone),
				parameters: parameters,
				date: new Date()
			});
		} catch (e) {
			this._request('log', {
				type: type,
				component: component,
				parameters: ['evaluation failed: ' + e.message],
				date: new Date()
			});
		}
	};

	SocketLog.prototype._request = function(handler, parameters) {
		var id = this._messageCount++,
			payload = '';

		if (!this._isConnectionValid()) {
			this._requestQueue.push({
				handler: handler,
				parameters: parameters
			});

			return;
		}

		try {
			payload = JSON.stringify({
				id: id,
				handler: handler,
				parameters: parameters,
				expectResponse: false
			});
		} catch (e) {
			throw new Error('serializing failed (' + e.message + ')');
		}

		if (payload.length > 1024) {
			throw new Error('message too long');
		}

		this._ws.send(payload);
	};

	SocketLog.prototype._preprocessData = function(data) {
		var key,
			i;

		if (typeof(data) === 'undefined') {
			return '<{[UNDEFINED]}>';
		} else if (data instanceof Date) {
			return '<{[DATE:' + data.toString() + ']}>';
		} else if (typeof(data) === 'function') {
			return '<{[FUNCTION:' + this._getFunctionName(data) + ']}>';
		} else if (Object.prototype.toString.call(data) === '[object Object]') {
			for (key in data) {
				data[key] = this._preprocessData(data[key]);
			}

			return data;
		} else if (Object.prototype.toString.call(data) === '[object Array]') {
			for (i = 0; i < data.length; i++) {
				data[i] = this._preprocessData(data[i]);
			}

			return data;
		} else {
			return data;
		}
	};

	SocketLog.prototype._getFunctionName = function(fn) {
		var name = fn.toString();

		name = name.substr('function '.length);
		name = name.substr(0, name.indexOf('('));

		return name;
	};

	SocketLog.prototype._connect = function(host, port) {
		try {
			this._ws = new WebSocket('ws://' + host + ':' + port);

			this._ws.onopen = this._onSocketOpen.bind(this);
			this._ws.onmessage = this._onSocketMessage.bind(this);
			this._ws.onclose = this._onSocketClose.bind(this);
		} catch (e) {}
	};

	SocketLog.prototype._reconnect = function() {
		this._connect(this._host, this._port);
	};

	SocketLog.prototype._onSocketOpen = function() {
		var request;

		this._requestQueue.unshift({
			handler: 'becomeInspected',
			parameters: {}
		});

		this._requestQueue.unshift({
			handler: 'refresh',
			parameters: {}
		});

		while (this._requestQueue.length > 0) {
			request = this._requestQueue.shift();

			try {
				this._request(request.handler, request.parameters);
			} catch (e) {
				this._request('log', {
					type: request.parameters.type,
					component: request.parameters.component,
					parameters: ['evaluation failed: ' + e.message],
					date: new Date()
				});
			}
		}

		this._hadValidConnection = true;
	};

	SocketLog.prototype._onSocketMessage = function(payload) {
		if (payload.type !== 'message' || payload.data.substr(0, 1) !== '{') {
			return;
		}

		var request = JSON.parse(payload.data);

		switch (request.handler) {
			case 'javascript-autocomplete':
				this._handleJavascriptAutocomplete(request.parameters.value);
			break;

			case 'execute-javascript':
				this._handleExecuteJavascript(request.parameters.value);
			break;
		}
	};

	SocketLog.prototype._onSocketClose = function() {
		if (this._hadValidConnection) {
			window.setTimeout(function() {
				this._reconnect();
			}.bind(this), 1000);
		}
	};

	SocketLog.prototype._isConnectionValid = function() {
		return this._ws !== null && this._ws.readyState === 1;
	};

	SocketLog.prototype._handleJavascriptAutocomplete = function(value) {
		var hints = jsComplete.autocomplete(value, window);

		this._request('javascript-autocomplete-response', {
			hints: hints
		});
	};

	SocketLog.prototype._handleExecuteJavascript = function(value) {
		var result = eval(value);

		this._log('javascript', 'LogViking', result);
	};

	return SocketLog;
});
