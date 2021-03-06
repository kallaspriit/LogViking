/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger',
	'src/Server',
	'src/State',
	'src/EventHub',
	'components/HistoryButton'
], function(React, logger, server, state, eventHub, HistoryButton) {
	'use strict';

	var log = logger.get('ServerFormComponent');

	var ServerForm = React.createClass({displayName: 'ServerForm',

		listen: function(e) {
			this.restartServer();

			e.preventDefault();
		},

		stop: function(e) {
			// TODO use selected host/port
			log.info('stop server');

			if (server.isStarted()) {
				server.stop();
			}

			e.preventDefault();
		},

		restartServer: function() {
			log.info('restarting server');

			if (server.isStarted()) {
				server.stop();
			}

			log.info('listen', state.server.host, state.server.port);

			try {
				server.listen(state.server.host, state.server.port);
			} catch (e) {}
		},

		componentDidMount: function() {
			server.on([server.Event.STARTED, server.Event.STOPPED, server.Event.CLIENTS_CHANGED], function() {
				eventHub.emit(eventHub.Change.SERVER);
			}.bind(this));

			eventHub.on(eventHub.Change.SERVER, function() {
				this.forceUpdate();
			}.bind(this));
		},

		render: function () {
			log.info('render');

			var hostButtonSource = {
					getLabels: function() {
						return {
							name: 'Host',
							placeholder: 'Add host'
						};
					}.bind(this),

					getCurrentValue: function() {
						return state.server.host;
					}.bind(this),

					getOptions: function() {
						return state.server.hostHistory;
					}.bind(this),

					selectOption: function(index) {
						log.info('select host: "' + state.server.hostHistory[index] + '"');

						state.server.host = state.server.hostHistory[index];

						this.restartServer();
					}.bind(this),

					addOption: function(name) {
						log.info('add host: "' + name + '"');

						state.server.hostHistory.push(name);
						state.server.host = name;

						this.restartServer();
					}.bind(this),

					removeOption: function(index) {
						log.info('remove host: "' + state.server.hostHistory[index] + '"');

						state.server.hostHistory.splice(index, 1);
					}.bind(this)
				},
				portButtonSource = {
					getLabels: function() {
						return {
							name: 'Port',
							placeholder: 'Add port'
						};
					}.bind(this),

					getCurrentValue: function() {
						return state.server.port;
					}.bind(this),

					getOptions: function() {
						return state.server.portHistory;
					}.bind(this),

					selectOption: function(index) {
						log.info('select port: "' + state.server.portHistory[index] + '"');

						state.server.port = state.server.portHistory[index];

						this.restartServer();
					}.bind(this),

					addOption: function(name) {
						log.info('add port: "' + name + '"');

						state.server.portHistory.push(name);
						state.server.port = name;

						this.restartServer();
					}.bind(this),

					removeOption: function(index) {
						log.info('remove port: "' + state.server.portHistory[index] + '"');

						state.server.portHistory.splice(index, 1);
					}.bind(this),

					transformValue: function(value) {
						var transformedValue = parseInt(value, 10);

						if (isNaN(transformedValue)) {
							transformedValue = '';
						}

						return transformedValue;
					}.bind(this)
				},
				started = server.isStarted(),
				actionBtn = started
					? React.DOM.button({type: "submit", className: "btn btn-primary", onClick: this.stop}, "Stop")
					: React.DOM.button({type: "submit", className: "btn btn-primary", onClick: this.listen}, "Listen");

			return (
				React.DOM.form({className: "navbar-form navbar-right form-inline app-server-form"}, 
					React.DOM.div({className: "btn-group"}, 
						HistoryButton({source: hostButtonSource}), 
						HistoryButton({source: portButtonSource}), 
						actionBtn
					)
				)
			);
		}
	});
	
	return ServerForm;
});