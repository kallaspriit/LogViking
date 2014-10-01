define([
	'jquery',
	'logviking/Logger',
	'src/LocalStorage',
	'src/EventHub'
], function($, logger, LocalStorage, eventHub) {
	'use strict';
	
	var log = logger.get('State');

	var State = function() {
		this._storage = null;
		this._suffix = 'State';
	};

	State.ServerState = {
		host: 'localhost',
		port: 2222,
		hostHistory: [
			'localhost'
		],
		portHistory: [
			2222
		],

		onChange: function() {
			eventHub.emit(eventHub.Change.SERVER);
		}
	};

	State.TypeFilterState = {
		log: true,
		info: true,
		warn: true,
		error: true,
		javascript: true,

		onChange: function() {
			eventHub.emit(eventHub.Change.TYPE_FILTER);
		}
	};
	
	State.prototype.init = function() {
		log.info('init');

		this._storage = new LocalStorage('state');

		this._setupStates();
	};

	State.prototype._setupStates = function() {
		var suffixLength = this._suffix.length,
			key,
			type,
			value;

		for (key in State) {
			value = State[key];

			if (key.length < suffixLength + 1 || key.substr(key.length - suffixLength) !== this._suffix) {
				continue;
			}

			// converts "MyDataConfig" to "myData"
			type = (key.substr(0, 1).toLowerCase() + key.substr(1)).substr(0, key.length - suffixLength);

			log.info('create "' + type + '"');

			this[type] = this._fetch(key, State[key]);
		}
	};

	State.prototype._fetch = function(type, defaults) {
		log.info('fetch "' + type + '"', defaults);

		var info = this._storage.fetch(type, defaults);

		info._state = this;
		info._type = type;

		return this._makeObject(type, info);
	};

	State.prototype._store = function(type, data) {
		log.info('store "' + type + '"', data);

		this._storage.store(type, data);
	};

	State.prototype._makeObject = function(type, info) {
		var state = {},
			base = State[type],
			methods = this._getStateObjectMethods(),
			key;

		$.extend(state, base, info, methods);

		Object.observe(state, function(/*changes*/) {
			state.save();
		});

		for (key in state) {
			if (state[key] !== null && typeof state[key] === 'object') {
				Object.observe(state[key], function(/*changes*/) {
					state.save();
				});
			}
		}

		return state;
	};

	State.prototype._getStateObjectMethods = function() {
		return {
			save: function() {
				this._state._store(this._type, this.getData());

				if (typeof this.onChange === 'function') {
					this.onChange.call(this);
				}
			},
			getData: function() {
				var data = {},
					key,
					value;

				for (key in this) {
					value = this[key];

					if (key.substr(0, 1) === '_' || typeof value === 'function') {
						continue;
					}

					data[key] = value;
				}

				return data;
			}
		};
	};

    return new State();
});