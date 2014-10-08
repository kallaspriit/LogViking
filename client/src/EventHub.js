define([
	'logviking/Logger',
	'src/EventEmitter'
], function(logger, EventEmitter) {
	'use strict';
	
	var log = logger.get('EventHub');

	var EventHub = function() {
		EventEmitter.call(this);
	};

	EventHub.prototype = Object.create(EventEmitter.prototype);

	EventHub.Intent = EventHub.prototype.Intent = {
		UPDATE_JAVASCRIPT_AUTOCOMPLETE: 'update-javascript-autocomplete',
		EXECUTE_REMOTE_JAVASCRIPT: 'execute-remote-javascript',
		CLEAR_MESSAGES: 'clear-messages'
	};

	EventHub.Change = EventHub.prototype.Change = {
		SERVER: 'server',
		TYPE_FILTER: 'type-filter',
		CONTENT_FILTER: 'content-filter',
		LOG_ENTRIES: 'log-entries',
		JAVASCRIPT_AUTOCOMPLETE_HINTS_UPDATED: 'javascript-autocomplete-hints-updated',
	};
	
	EventHub.prototype.init = function() {
		log.info('init');
	};

	EventHub.prototype._onEmit = function(event, shouldPropagate) {
		log.info('emit', event, shouldPropagate);
	};

    return new EventHub();
});