define([
	'logviking/Logger'
], function(logger) {
	'use strict';

	var log = logger.get('Server');

	var Server = function(config) {
		this._config = config;
	};
	
	Server.prototype.init = function() {
		log.info('init', this._config);
	};

    return Server;
});