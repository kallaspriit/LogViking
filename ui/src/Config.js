define([
	'jquery',
	'logviking/Logger',
	'src/LocalStorage'
], function($, logger, LocalStorage) {
	'use strict';
	
	var log = logger.get('Config');

	var Config = function() {
		this._storage = null;
	};

	Config.ServerConfig = {
		host: 'localhost',
		port: 2222
	};
	
	Config.prototype.init = function() {
		log.info('init');

		this._storage = new LocalStorage('config');

		this._setupConfigurations();
	};

	Config.prototype._setupConfigurations = function() {
		var key,
			type,
			value;

		for (key in Config) {
			value = Config[key];

			if (key.length < 7 || key.substr(key.length - 6) !== 'Config') {
				continue;
			}

			type = key.substr(0, 1).toLowerCase() + key.substr(1);

			log.info('create "' + type + '"');

			this[type] = this._fetch(key, Config[key]);
		}
	};

	Config.prototype._fetch = function(type, defaults) {
		log.info('fetch "' + type + '"', defaults);

		var info = this._storage.fetch(type, defaults);

		info._config = this;
		info._type = type;

		return this._makeObject(type, info);
	};

	Config.prototype._store = function(type, data) {
		log.info('store "' + type + '"', data);

		this._storage.store(type, data);
	};

	Config.prototype._makeObject = function(type, info) {
		var config = {},
			base = Config[type],
			methods = this._getConfigObjectMethods();

		$.extend(config, base, info, methods);

		Object.observe(config, function(changes) {
			config.save();
		});

		return config;
	};

	Config.prototype._getConfigObjectMethods = function() {
		return {
			save: function() {
				this._config._store(this._type, this.getData());
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

    return new Config();
});