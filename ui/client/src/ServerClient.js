define([
	'logviking/Logger',
	'src/EventEmitter',
	'models/LogEntryModel'
], function(logger, EventEmitter, LogEntryModel) {
	'use strict';
	
	var log = logger.get('ServerClient');

	var ServerClient = function() {
		EventEmitter.call(this);

		this._ws = null;
		this._requestCount = 0;
		this._entryCount = 0;
	};

	ServerClient.prototype = Object.create(EventEmitter.prototype);

	ServerClient.Event = ServerClient.prototype.Event = {
		LOG_ENTRY_RECEIVED: 'log-entry-received',
		REFRESH_REQUESTED: 'refresh-requested'
	};
	
	ServerClient.prototype.connect = function(host, port) {
		if (this._isConnectionValid()) {
			log.info('closing existing socket');

			this._ws.close();
		}

		log.info('connecting to ' + host + ':' + port);

		this._ws = new WebSocket('ws://' + host + ':' + port);

		this._ws.onopen = this._onSocketOpen.bind(this);
		this._ws.onmessage = this._onSocketMessage.bind(this);
	};

	ServerClient.prototype._onSocketOpen = function() {
		this._request('become-client');
	};

	ServerClient.prototype._onSocketMessage = function(event) {
		var payload;

		if (event.data.substr(0, 1) !== '{') {
			return;
		}

		payload = JSON.parse(event.data);

		if (typeof(payload) !== 'object' || payload === null || typeof(payload.handler) !== 'string') {
			return;
		}

		switch (payload.handler) {
			case 'log':
				this._handleLog(payload.info);
			break;

			case 'refresh':
				this._handleRefresh();
			break;

			default:
				log.warn('server client has no handler for "' + payload.handler + '"');
			break;
		}
	};

	ServerClient.prototype._handleLog = function(info) {
		var entryId = this._entryCount++,
			date = new Date(info.date),
			entry = new LogEntryModel({
				id: entryId,
				date: date,
				type: info.type,
				component: info.component,
				data: info.parameters
			});

		//log.info('handle log entry', entry);

		this.emit(ServerClient.Event.LOG_ENTRY_RECEIVED, entry);
	};

	ServerClient.prototype._handleRefresh = function() {
		log.info('handle refresh');

		this.emit(ServerClient.Event.REFRESH_REQUESTED);
	};

	ServerClient.prototype._isConnectionValid = function() {
		return this._ws !== null && this._ws.readyState === 1;
	};

	ServerClient.prototype._request = function(handler, parameters) {
		if (!this._isConnectionValid()) {
			return;
		}

		var payload = {
			id: this._requestCount++,
			handler: handler,
			parameters: parameters || {},
			expectResponse: false
		};

		log.info('making request', payload);

		this._ws.send(JSON.stringify(payload));
	};

    return ServerClient;
});