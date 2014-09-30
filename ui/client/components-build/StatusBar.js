/** @jsx React.DOM */
define([
	'jquery',
	'React',
	'logviking/Logger',
	'src/Server'
], function($, React, logger, server) {
	'use strict';
	
	var log = logger.get('StatusBarComponent');

	var StatusBar = React.createClass({displayName: 'StatusBar',

		getInitialState: function() {
			return {
				statusText: 'loading',
				level: ''
			}
		},

		componentDidMount: function() {
			server.on([server.Event.STARTED, server.Event.STOPPED, server.Event.CLIENTS_CHANGED], function() {
				this.evaluate();
			}.bind(this));

			server.on(server.Event.ERROR, this.onServerError);

			this.evaluate();
		},

		evaluate: function(forceStatusText) {
			log.info('evaluating state');

			var newStatusText = this.state.statusText,
				newLevel = this.state.level;

			if (server.isStarted()) {
				log.info('server started');

				if (server.isClientConnected()) {
					newStatusText = 'client connected';
					newLevel = 'good';
				} else {
					newStatusText = 'no client connected';
					newLevel = 'warn';
				}
			} else {
				log.info('server stopped');

				newStatusText = 'server stopped';
				newLevel = 'bad';
			}

			if (typeof forceStatusText === 'string') {
				newStatusText = forceStatusText;
			}

			this.setState({
				statusText: newStatusText,
				level: newLevel
			});
		},

		onServerError: function(message, code) {
			var statusText = 'Server error';

			switch (code) {
				case 'EADDRNOTAVAIL':
					statusText = 'Invalid host/port';
				break;

				case 'EACCES':
					statusText = 'Port not allowed';
				break;
			}

			this.evaluate(statusText);
		},

		render: function () {
			log.info('render');

			$(document.body).removeClass('status-good status-warn status-bad');

			if (this.state.level !== '') {
				$(document.body).addClass('status-' + this.state.level);
			}
		
			return (
				React.DOM.div({className: "app-status"}, this.state.statusText)
			);
		}
	});
	
	return StatusBar;
});