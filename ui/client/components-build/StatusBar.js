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
				statusText: 'loading'
			}
		},

		componentDidMount: function() {
			server.on([server.Event.STARTED, server.Event.STOPPED, server.Event.CLIENTS_CHANGED], function() {
				this.evaluate();
			}.bind(this));

			this.evaluate();
		},

		evaluate: function() {
			log.info('evaluating state');

			var newStatusText = this.state.statusText;

			$(document.body).removeClass('status-good status-warn status-bad');

			if (server.isStarted()) {
				log.info('server started');

				if (server.isClientConnected()) {
					newStatusText = 'client connected';

					$(document.body).addClass('status-good');
				} else {
					newStatusText = 'no client connected';

					$(document.body).addClass('status-warn');
				}
			} else {
				log.info('server stopped');

				newStatusText = 'server stopped';

				$(document.body).addClass('status-bad');
			}

			//if (newStatusText !== this.state.statusText) {
				this.setState({
					statusText: newStatusText
				});
			//}
		},

		render: function () {
			log.info('render');
		
			return (
				React.DOM.div({className: "app-status"}, this.state.statusText)
			);
		}
	});
	
	return StatusBar;
});